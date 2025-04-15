import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ecoData } from "../data/ecoData";
import { eventData } from "../data/eventData";
//import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Njb29sZHVkZTExIiwiYSI6ImNtOG5qcHFiZTAxZW0ya29qcHZodDg1ODgifQ.V0mzF9JNFHbAzhccUQjMaw";

function MapPage() {
  const ChevronDown = () => <span>▼</span>;
  const ChevronUp = () => <span>▲</span>;

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);
  const [filters, setFilters] = useState(["all"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    "recycling",
    "zero_waste",
    "local_products",
    "plant_store",
    "community_center",
    "farmers_market",
    "thrift_store",
    "sustainability_workshop",
    "wildlife_site",
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
    wildlife_site: "Wildlife Sites",
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

      ecoData.forEach((location) => {
        const { name, coords, icon, type, address } = location;
        if (!coords || coords.length !== 2) return;

        const el = document.createElement("div");
        el.className = "text-2xl cursor-pointer";
        el.textContent = icon;

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat(coords)
          .addTo(mapRef.current);

        el.addEventListener("click", () => setSelectedLocation(location));
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
      <div className="pt-[7rem]">
        <div className="relative">
          <div className="h-[90vh]">
            <div ref={mapContainer} className="w-full h-full" />

            {/* Floating Control Panel */}
            <div className="absolute top-[2rem] left-4 z-10 bg-white p-4 rounded-md shadow-md space-y-6 w-80 overflow-y-auto max-h-[90vh]">

              {/* Search */}
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

              {/* Filters Dropdown */}
              <div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-green-600 focus:outline-none"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showFilters && (
                  <div className="mt-3 space-y-2">
                    {filterOptions.map((f) => {
                      const isActive = filters.includes(f);
                      return (
                        <label key={f} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => toggleFilter(f)}
                            className="accent-green-600"
                          />
                          <span>{filterLabels[f]}</span>
                        </label>
                      );
                    })}
                    <button
                      onClick={clearAllFilters}
                      className="mt-2 text-xs text-red-600 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* Eco Events Section */}
              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Upcoming Events:</h3>
                <ul className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  {eventData.map((event, index) => (
                    <Link
                      key={index}
                      to={`/events?event=${encodeURIComponent(event.title)}`}
                      className="block"
                    >
                      <li className="bg-green-50 p-3 rounded-md border border-green-200 shadow-sm text-sm hover:bg-green-100 transition">
                        <div className="font-semibold text-green-700">{event.title}</div>
                        <div className="text-gray-600">
                          {event.location_name} – {new Date(event.start_time).toLocaleString()}
                        </div>
                        <div className="text-gray-500">{event.address}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          📧 {event.contact_email} | 📞 {event.contact_phone}
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>

            {/* Location Detail */}
            {selectedLocation && (
              <div className="absolute bottom-0 left-0 w-full bg-white shadow-2xl border-t border-gray-300 z-10">
                <div className="px-8 py-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-left">
                      <h3 className="text-3xl font-bold text-green-800 flex items-center gap-3">
                        {selectedLocation.icon} {selectedLocation.name}
                      </h3>
                      <p className="text-lg text-gray-500 capitalize mt-1">
                        {filterLabels[selectedLocation.type] || selectedLocation.type}
                      </p>
                      {selectedLocation.address && (
                        <p className="text-lg text-gray-700 mt-2">{selectedLocation.address}</p>
                      )}
                      {selectedLocation.phone && (
                        <p className="text-lg text-gray-700 mt-1">
                          <span className="text-red-500 mr-2">📞</span> {selectedLocation.phone}
                        </p>
                      )}
                      {selectedLocation.email && (
                        <p className="text-lg text-gray-700 mt-1">
                          <span className="text-blue-500 mr-2">✉️</span> {selectedLocation.email}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="text-lg text-red-600 hover:underline sm:self-start"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
