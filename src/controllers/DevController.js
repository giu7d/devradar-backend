import Axios from "axios";
import Dev from "../models/Dev";
import formatTechsArray from "../utils/formatTechsArray";

async function store(request, response) {
  const { github_username, coordinates, techs } = request.body;

  let dev = await Dev.findOne({ github_username });

  if (!dev) {
    // Tech
    const formatedTechs = formatTechsArray(techs);

    // GitHub Info
    const gitUserResponse = await Axios.get(
      `https://api.github.com/users/${github_username}`
    );
    const { name = github_username, avatar_url, bio } = gitUserResponse.data;

    // Position Info
    const { lon, lat } = coordinates;
    const location = {
      type: "Point",
      coordinates: [lon, lat]
    };

    // Persistence
    dev = await Dev.create({
      name,
      avatar_url,
      bio,
      github_username,
      location,
      techs: formatedTechs
    });
  }

  return response.json(dev);
}

async function index(request, response) {
  const devs = await Dev.find();

  return response.json(devs);
}

// async function update
// async function destroy

export default { store, index };

// const gitRepoResponse = await Axios.get(
//   `https://api.github.com/users/${github_username}/repos`
// );
// const gitTechs = gitRepoResponse.data.reduce((accumulator, { language }) => {
//   if (language !== null && accumulator.indexOf(language) === -1) {
//     accumulator.push(language);
//   }
//   return accumulator;
// }, []);
