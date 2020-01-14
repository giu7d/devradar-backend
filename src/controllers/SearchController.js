import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";
import formatTechsArray from "../utils/formatTechsArray";

async function index(request, response) {
  const { lat, lon, techs, maxDistance = 1000 } = request.query;
  const formatedTechs = formatTechsArray(parseStringAsArray(techs));

  const devs = await Dev.find({
    techs: {
      $in: formatedTechs
    },
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lon, lat]
        },
        $maxDistance: maxDistance
      }
    }
  });

  return response.json(devs);
}

export default { index };
