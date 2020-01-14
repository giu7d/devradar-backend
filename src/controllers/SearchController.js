import Dev from "../models/Dev";
import { formatArrayToTechs, parseStringToArray } from "../utils";

async function index(request, response) {
  const { lat, lon, techs, maxDistance = 1000 } = request.query;

  try {
    const formatedTechs = formatArrayToTechs(parseStringToArray(techs));

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
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

export default { index };
