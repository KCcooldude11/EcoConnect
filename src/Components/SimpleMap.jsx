// src/Components/SimpleMap.jsx
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { ecoData } from "../data/ecoData";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1Ijoia2Njb29sZHVkZTExIiwiYSI6ImNtOG5qcHFiZTAxZW0ya29qcHZodDg1ODgifQ.V0mzF9JNFHbAzhccUQjMaw";

function SimpleMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-111.8910, 40.7608],
      zoom: 11,
      minZoom: 6,
      maxZoom: 16,
    });
    // Force resize after short delay to prevent invisible map glitch
    setTimeout(() => {
    mapRef.current?.resize();
  }, 200);

    mapRef.current.scrollZoom.disable();

    mapRef.current.on("mouseleave", () => {
      if (mapRef.current.scrollZoom.isEnabled()) {
        mapRef.current.scrollZoom.disable();
      }
    });

    // 🔥 Enable scroll zoom only when the map is clicked
    mapRef.current.on("click", (e) => {
      if (!mapRef.current.scrollZoom.isEnabled()) {
        mapRef.current.scrollZoom.enable();
      }
    
      // Deselect name if clicking somewhere without a marker
      const features = mapRef.current.queryRenderedFeatures(e.point);
      if (!features.length) {
        setSelectedName(null);
      }
    });

    mapRef.current.on("load", async () => {
      try {
        const res = await fetch("/geo/utah.geojson");
        const utah = await res.json();

        mapRef.current.addSource("utah", { type: "geojson", data: utah });
        mapRef.current.addLayer({
          id: "utah-fill",
          type: "fill",
          source: "utah",
          paint: { "fill-color": "#a7f3d0", "fill-opacity": 0.3 },
        });
        mapRef.current.addLayer({
          id: "utah-outline",
          type: "line",
          source: "utah",
          paint: { "line-color": "#10b981", "line-width": 3 },
        });

        const maskGeoJSON = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [-180, -85],
                    [180, -85],
                    [180, 85],
                    [-180, 85],
                    [-180, -85],
                  ],
                  ...utah.geometry.type === "Polygon"
                    ? [utah.geometry.coordinates[0]]
                    : utah.geometry.coordinates.map((p) => p[0]),
                ],
              },
            },
          ],
        };

        mapRef.current.addSource("utah-mask", { type: "geojson", data: maskGeoJSON });
        mapRef.current.addLayer({
          id: "utah-dim",
          type: "fill",
          source: "utah-mask",
          paint: { "fill-color": "#000000", "fill-opacity": 0.35 },
        });

        ecoData.forEach(({ name, coords, icon }) => {
          const el = document.createElement("div");
          el.className = "text-xl cursor-pointer";
          el.textContent = icon;
        
          // Add the popup
          const popup = new mapboxgl.Popup({ offset: 30, closeButton: false }).setHTML(`
            <div style="
              position: relative;
              color: black;
              font-weight: bold;
              padding: 6px 10px;
              padding-right: 28px; /* 👈 makes space for the X */
              background: white;
              border-radius: 6px;
              font-family: sans-serif;
            ">
              <button
                onclick="this.closest('.mapboxgl-popup').remove()"
                style="
                  all: unset;
                  position: absolute;
                  top: 6px;
                  right: 8px;
                  font-size: 18px;
                  line-height: 1;
                  color: black;
                  font-family: sans-serif;
                  cursor: pointer;
                "
              >
                &times;
              </button>
              ${name}
            </div>
          `);
          
  
          // Create marker and bind popup to it (no togglePopup or manual event listener)
          new mapboxgl.Marker({ element: el })
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(mapRef.current);
        });
        
      
        
      } catch (err) {
        console.error("Failed to load geojson:", err);
      }
    });

    return () => mapRef.current?.remove();
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="w-full h-full rounded-2xl" />
  
      
  
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded z-10">
        Click map to enable zoom
      </div>
  
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <Link to="/map">
          <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-green-700 transition">
            Explore Full Map
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SimpleMap;
