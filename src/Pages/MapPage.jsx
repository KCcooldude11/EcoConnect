import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ecoData } from "../data/ecoData";
import { Link } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Njb29sZHVkZTExIiwiYSI6ImNtOG5qcHFiZTAxZW0ya29qcHZodDg1ODgifQ.V0mzF9JNFHbAzhccUQjMaw";

function MapPage() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);
  const [filters, setFilters] = useState(["all"]);
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = [
    "recycling",
    "zero_waste",
    "local_products",
    "plant_store",
    "community_center",
    "farmers_market",
    "thrift_store",
    "sustainability_workshop",
    "wildlife_site"
  ];

  const filterLabels = {
    all: "All",
    recycling: "Recycling",
    zero_waste: "Zero Waste",
    local_products: "Local Products",
    plant_store: "Plant Stores",
    community_center: "Community Centers",
    farmers_market: "Farmers Markets",
    thrift_store: "Thrift Stores",
    sustainability_workshop: "Sustainability Workshops",
    wildlife_site: "Wildlife Sites"
  };

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-111.6585, 40.2338],
      zoom: 11,
      minZoom: 6,
      maxZoom: 16,
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

      ecoData.forEach(({ name, coords, icon, type }) => {
        if (!coords || coords.length !== 2) return;

        const el = document.createElement("div");
        el.className = "text-2xl";
        el.textContent = icon;

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(coords)
          .setPopup(popup)
          .addTo(mapRef.current);

        markerRefs.current.push({ marker, type, name: name.toLowerCase() });
      });
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) mapRef.current.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    markerRefs.current.forEach(({ marker, type, name }) => {
      const matchesFilter = filters.includes("all") || filters.includes(type);
      const matchesSearch = name.includes(searchTerm.toLowerCase());
      marker.getElement().style.display =
        matchesFilter && matchesSearch ? "block" : "none";
    });
  }, [filters, searchTerm]);

  const toggleFilter = (f) => {
    if (f === "all") {
      setFilters(["all"]);
    } else {
      setFilters((prev) => {
        const next = prev.includes(f)
          ? prev.filter((t) => t !== f)
          : [...prev.filter((t) => t !== "all"), f];
        return next.length === 0 ? ["all"] : next;
      });
    }
  };

  const clearAllFilters = () => {
    setFilters(["all"]);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen">
      {/* Map Section */}
      <div className="pt-[7rem]">
        <div className="relative">
          <div className="h-[70vh]">
            <div ref={mapContainer} className="w-full h-full" />
            {/* Floating Control Panel */}
            <div className="absolute top-[2rem] left-4 z-10 bg-white p-4 rounded-md shadow-md space-y-4 w-80">
              {/* Search Bar */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search Locations
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
                <span className="block text-sm font-medium text-gray-700 mb-2">Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((f) => {
                    const isActive = filters.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFilter(f)}
                        className={`px-3 py-1 rounded text-sm font-medium border transition ${
                          isActive
                            ? "bg-green-600 text-white border-green-700 shadow"
                            : "bg-white text-gray-700 hover:bg-green-100 border-gray-300"
                        }`}
                      >
                        {filterLabels[f]}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="mt-3 text-sm text-red-600 hover:underline"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Tray */}
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default MapPage;
