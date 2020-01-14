import Axios from "axios";

async function getGitHubUser(username) {
  const gitUserResponse = await Axios.get(
    `https://api.github.com/users/${username}`
  );
  const { name = username, avatar_url, bio } = gitUserResponse.data;

  return { name, avatar_url, bio };
}

async function getGitHubTechs(username) {
  const gitRepoResponse = await Axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  return gitRepoResponse.data.reduce((list, { language }) => {
    if (language !== null && list.indexOf(language) === -1) {
      list.push(language);
    }
    return list;
  }, []);
}

export { getGitHubUser, getGitHubTechs };
