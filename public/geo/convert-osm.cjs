const fs = require("fs");

// Load your GeoJSON file
const raw = JSON.parse(fs.readFileSync("osm-utah-eco.geojson", "utf-8"));

// Grab features from valid GeoJSON
const features = raw.features || [];

const ecoData = features.map((feature) => {
  const props = feature.properties || {};
  const [lon, lat] = feature.geometry.coordinates;

  return {
    name: props.name || "Unnamed Location",
    type: props.shop || props.amenity || props.leisure || "eco",
    coords: [lon, lat],
    icon:
      props.shop === "organic" ? "🛒" :
      props.amenity === "recycling" ? "♻️" :
      props.leisure === "garden" ? "🌿" :
      props.amenity === "shelter" ? "🏠" :
      props.amenity === "community_centre" ? "🏢" :
      "🌍"
  };
});

fs.writeFileSync("ecoData.js", "export const ecoData = " + JSON.stringify(ecoData, null, 2) + ";\n");
console.log(`✅ Converted ${ecoData.length} features to ecoData.js`);
