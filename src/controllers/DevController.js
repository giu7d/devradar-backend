import Dev from "../models/Dev";
import { formatArrayToTechs, formatLocationPointFromCoord } from "../utils";
import { getGitHubUser } from "../services";

async function store(request, response) {
  try {
    const { github_username, coordinates, techs } = request.body;

    if (await Dev.findOne({ github_username })) {
      throw new Error("This user already exists!");
    }

    const { name, avatar_url, bio } = await getGitHubUser(github_username);
    const formatedTechs = formatArrayToTechs(techs);
    const location = formatLocationPointFromCoord(coordinates);

    const dev = await Dev.create({
      name,
      avatar_url,
      bio,
      github_username,
      location,
      techs: formatedTechs
    });

    return response.json(dev);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

async function index(request, response) {
  try {
    const devs = await Dev.find();
    return response.json(devs);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

async function indexOne(request, response) {
  const { username } = request.params;

  try {
    const dev = await Dev.findOne({ github_username: username });
    return response.json(dev);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

async function update(request, response) {
  const { username } = request.params;
  const { name, coordinates, techs } = request.body;

  try {
    const { avatar_url, bio } = await getGitHubUser(username);
    const formatedTechs = formatArrayToTechs(techs);
    const location = formatLocationPointFromCoord(coordinates);

    const dev = await Dev.findOneAndUpdate(
      { github_username: username },
      { name, location, avatar_url, bio, techs: formatedTechs },
      { new: true }
    );

    return response.json(dev);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

async function updateLocation(request, response) {
  const { username } = request.params;
  const { coordinates } = request.body;

  try {
    const location = formatLocationPointFromCoord(coordinates);

    const dev = await Dev.findOneAndUpdate(
      { github_username: username },
      { location },
      { new: true }
    );

    return response.json(dev);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

async function destroy(request, response) {
  const { username } = request.params;

  try {
    const dev = await Dev.findOneAndDelete({ github_username: username });
    return response.json(dev);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}

export default { store, index, indexOne, update, updateLocation, destroy };
