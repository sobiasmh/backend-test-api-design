const Contributor = require("../models/user");
const axios = require("axios");

const fetchNewContributors = async (org, repo, year, month = null) => {
  const url = `https://api.github.com/repos/${org}/${repo}/commits`;
  const params = {
    since: `${year}-${month || "01"}-01T00:00:00Z`,
    until: `${year}-${month || "12"}-31T23:59:59Z`,
    per_page: 100,
  };
  const newContributors = [];
  let page = 1;
  while (true) {
    const response = await axios.get(url, { params: { ...params, page } });
    if (response.status === 204) {
      break; // No more data
    }
    if (response.status !== 200) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }
    const commits = response.data;
    if (commits.length === 0) {
      break; // No more data
    }
    const usernames = new Set();
    commits.forEach((commit) => {
      const username = commit.author;
      if (!usernames.has(username)) {
        newContributors.push(username);
        usernames.add(username);
      }
    });
    page += 1;
  }
  return newContributors;
};

exports.getContributers = async (req, res) => {
  const { org, repo, year } = req.params;
  try {
    const contributors = await Contributor.find({ repo, year });
    const newContributors = await fetchNewContributors(org, repo, year);
    const numNewContributors = newContributors.filter(
      (username) => !contributors.some((c) => c.username === username)
    ).length;
    res.json({
      org,
      repo,
      year,
      newContributors: numNewContributors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
