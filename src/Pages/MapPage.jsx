import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ecoData } from "../data/ecoData"; // Ensure this exports your sample data
import { Link } from "react-router-dom";


// Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Njb29sZHVkZTExIiwiYSI6ImNtOG5qcHFiZTAxZW0ya29qcHZodDg1ODgifQ.V0mzF9JNFHbAzhccUQjMaw";

function MapPage() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  // Store marker instances for filtering
  const markerRefs = useRef([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Define filter options and display labels (e.g., "community_centre" becomes "Community Center")
  const filterOptions = ["all", "garden", "recycling", "shelter", "community_centre"];
  const filterLabels = {
    all: "All",
    garden: "Garden",
    recycling: "Recycling",
    shelter: "Shelter",
    community_centre: "Community Center",
  };

  useEffect(() => {
    if (mapRef.current) return; // Initialize map only once

    // Create the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-111.8910, 40.7608], // Example center (Salt Lake City)
      zoom: 11,
      minZoom: 6,
      maxZoom: 16,
    });

    mapRef.current.on("load", async () => {
      // Load Utah geojson and add layers
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
        // Create a dimming mask outside Utah
        const maskGeoJSON = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
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
        mapRef.current.addLayer(
          {
            id: "utah-dim",
            type: "fill",
            source: "utah-mask",
            paint: { "fill-color": "#000000", "fill-opacity": 0.35 },
          },
          "utah-fill"
        );
      } catch (error) {
        console.error("Error loading Utah geojson:", error);
      }

      // Add markers from ecoData
      ecoData.forEach(({ name, coords, icon, type }) => {
        const el = document.createElement("div");
        el.className = "text-2xl";
        el.textContent = icon;

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(coords)
          .setPopup(popup)
          .addTo(mapRef.current);

        // Store marker info for filtering
        markerRefs.current.push({ marker, type, name: name.toLowerCase() });
      });
    });
  }, []);

  // Resize map on window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) mapRef.current.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update marker visibility based on filter and search
  useEffect(() => {
    markerRefs.current.forEach(({ marker, type, name }) => {
      const matchesFilter = filter === "all" || filter === type;
      const matchesSearch = name.includes(searchTerm.toLowerCase());
      marker.getElement().style.display =
        matchesFilter && matchesSearch ? "block" : "none";
    });
  }, [filter, searchTerm]);

  return (
    <div className="min-h-screen">
      {/* Map Section */}
      <div className="pt-[7rem]">
        <div className="relative">
          {/* Map container set to 70vh */}
          <div className="h-[70vh]">
            <div ref={mapContainer} className="w-full h-full" />
            {/* Floating Control Panel */}
            <div className="absolute top-[2rem] left-4 z-10 bg-white p-4 rounded-md shadow-md space-y-4 w-80">
              {/* Search Bar */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search Events
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                />
              </div>
              {/* Filter Buttons */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">Filter:</span>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded text-sm font-medium border transition ${
                        filter === f
                          ? "bg-green-600 text-white border-green-700 shadow"
                          : "bg-white text-gray-700 hover:bg-green-100 border-gray-300"
                      }`}
                    >
                      {filterLabels[f]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Tray Section with Professional Styling */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Support Eco-Connect</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your donation helps us connect communities with eco-friendly initiatives.
            Every contribution makes a difference and helps drive positive change for our planet.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/donations">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 transition">
                Donate Now
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold border border-green-600 hover:bg-green-50 transition">
                Learn More
              </button>
            </Link>
            {/* <a
              href="/learn-more"
              className="text-green-600 font-medium hover:underline flex items-center"
            >
              Learn More
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MapPage;
