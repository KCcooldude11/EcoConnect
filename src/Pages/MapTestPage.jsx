import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = "pk.eyJ1Ijoia2Njb29sZHVkZTExIiwiYSI6ImNtOG5qcHFiZTAxZW0ya29qcHZodDg1ODgifQ.V0mzF9JNFHbAzhccUQjMaw";


function MapTestPage() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-122.4194, 37.7749],
      zoom: 10,
    });

    new mapboxgl.Marker()
      .setLngLat([-122.4194, 37.7749])
      .addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
      <div className="absolute bottom-6 left-6 z-10 bg-white/90 p-4 rounded-xl shadow-md max-w-sm">
        <h2 className="text-xl font-bold text-green-800">Map Test Page</h2>
        <p className="text-sm text-gray-700">Testing satellite streets style map here.</p>
      </div>
    </div>
  );
}

export default MapTestPage;
