import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { ecoData } from "../data/ecoData";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Njb29sZHVkZTExIiwiYSI6ImNtOG5qcHFiZTAxZW0ya29qcHZodDg1ODgifQ.V0mzF9JNFHbAzhccUQjMaw";

function MapSection() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-111.8910, 40.7608],
      zoom: 10,
      minZoom: 6,
      maxZoom: 16,
      attributionControl: false,
      scrollZoom: false, // Start with scroll zoom disabled
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", async () => {
      // 💡 Wait a moment after load before allowing scrollZoom toggle
      setTimeout(() => map.resize(), 100);

      try {
        const res = await fetch("/geo/utah.geojson");
        const utah = await res.json();

        map.addSource("utah", { type: "geojson", data: utah });

        map.addLayer({
          id: "utah-fill",
          type: "fill",
          source: "utah",
          paint: { "fill-color": "#a7f3d0", "fill-opacity": 0.3 },
        });

        map.addLayer({
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

        map.addSource("utah-mask", { type: "geojson", data: maskGeoJSON });
        map.addLayer(
          {
            id: "utah-dim",
            type: "fill",
            source: "utah-mask",
            paint: { "fill-color": "#000000", "fill-opacity": 0.35 },
          },
          "utah-fill"
        );

        ecoData.forEach(({ name, coords, icon }) => {
          const el = document.createElement("div");
          el.className = "text-xl";
          el.textContent = icon;

          const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

          new mapboxgl.Marker({ element: el })
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map);
        });
      } catch (err) {
        console.error("Failed to load geojson:", err);
      }
    });

    // Enable scroll zoom on click, then force resize
    map.on("click", () => {
      if (!map.scrollZoom.isEnabled()) {
        map.scrollZoom.enable();
        setTimeout(() => map.resize(), 50);
      }
    });

    // Disable again when leaving map area
    const handleMouseLeave = () => {
      if (map.scrollZoom.isEnabled()) {
        map.scrollZoom.disable();
      }
    };
    mapContainer.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      map.remove();
      mapContainer.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) mapRef.current.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="w-full h-full rounded-2xl" />

      {/* CTA Button */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <Link to="/map">
          <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-green-700 transition">
            Explore Full Map
          </button>
        </Link>
      </div>

      {/* Hint Text */}
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded z-10">
        Click map to enable zoom
      </div>
    </div>
  );
}

export default MapSection;
