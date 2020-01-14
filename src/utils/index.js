import PointSchema from "./PointSchema";

function formatArrayToTechs(array) {
  return array.map(el => el.toLowerCase().replace(" ", "-"));
}

function parseStringToArray(string) {
  return string.split(",").map(el => el.trim());
}

function formatLocationPointFromCoord(coordinates) {
  const { lon, lat } = coordinates;
  return formatLocationPoint(lon, lat);
}

function formatLocationPoint(lon, lat) {
  return {
    type: "Point",
    coordinates: [lon, lat]
  };
}

export {
  formatArrayToTechs,
  formatLocationPoint,
  formatLocationPointFromCoord,
  parseStringToArray,
  PointSchema
};
