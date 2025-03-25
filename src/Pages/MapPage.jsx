import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ecoData } from "../data/ecoData"; // update path if needed


// Mapbox access token
mapboxgl.accessToken = "pk.eyJ1Ijoia2Njb29sZHVkZTExIiwiYSI6ImNtOG5qcHFiZTAxZW0ya29qcHZodDg1ODgifQ.V0mzF9JNFHbAzhccUQjMaw";

function MapPage() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const markerRefs = useRef([]);

  useEffect(() => {
    if (mapRef.current) return;

    const bounds = [
      [-114.25, 36.99], // Southwest Utah
      [-109.04, 42.01], // Northeast Utah
    ];

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-111.8910, 40.7608], // Salt Lake City
      zoom: 11,
      minZoom: 6,
      maxZoom: 16,
      maxBounds: bounds,
    });

    mapRef.current.on("load", async () => {
      const res = await fetch("/geo/utah.geojson");
      const utah = await res.json();
    
      // 🔲 Add Utah state polygon
      mapRef.current.addSource("utah", {
        type: "geojson",
        data: utah,
      });
    
      mapRef.current.addLayer({
        id: "utah-fill",
        type: "fill",
        source: "utah",
        paint: {
          "fill-color": "#a7f3d0",
          "fill-opacity": 0.3,
        },
      });
    
      mapRef.current.addLayer({
        id: "utah-outline",
        type: "line",
        source: "utah",
        paint: {
          "line-color": "#10b981",
          "line-width": 3,
        },
      });
    
      // 🌫️ Add the dimming mask outside Utah
      const maskGeoJSON = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [ // World bounds
                  [-180, -85],
                  [180, -85],
                  [180, 85],
                  [-180, 85],
                  [-180, -85]
                ],
                ...utah.geometry.type === "Polygon"
                  ? [utah.geometry.coordinates[0]]
                  : utah.geometry.coordinates.map(p => p[0]) // for MultiPolygon
              ]
            }
          }
        ]
      };
    
      mapRef.current.addSource("utah-mask", {
        type: "geojson",
        data: maskGeoJSON,
      });
    
      mapRef.current.addLayer({
        id: "utah-dim",
        type: "fill",
        source: "utah-mask",
        paint: {
          "fill-color": "#000000",
          "fill-opacity": 0.35,
        },
      }, "utah-fill"); // insert below Utah fill
    
    });
    ecoData.forEach(({ name, coords, icon, type }) => {
      const el = document.createElement("div");
      el.className = "text-2xl";
      el.textContent = icon;
    
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);
    
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(mapRef.current);
    
      markerRefs.current.push({ marker, type });
    });
  }, []);

  // ✅ Filter markers when filter changes
  useEffect(() => {
    markerRefs.current.forEach(({ marker, type }) => {
      const visible = filter === "all" || filter === type;
      marker.getElement().style.display = visible ? "block" : "none";
    });
  }, [filter]);

  return (
    <div className="pt-40 h-[calc(100vh-7rem)] relative">
      {/* Filter Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-md shadow-md space-x-2">
        <span className="font-semibold text-gray-700">Filter:</span>
        {["all", "cleanup", "workshop", "nature"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm font-medium border ${
              filter === f
                ? "bg-green-600 text-white border-green-700"
                : "bg-white text-gray-700 hover:bg-green-100 border-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}

export default MapPage;
