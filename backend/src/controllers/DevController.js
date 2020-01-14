const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        };

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const techsArray = techs.split(",").map(tech => tech.trim());

            const git_response = await axios.get(
                `https://api.github.com/users/${github_username}`
            );

            const { avatar_url, name = login, bio } = git_response.data;

            dev = await Dev.create({
                name,
                avatar_url,
                bio,
                github_username,
                techs: techsArray,
                location
            });
        }
        return res.json(dev);
    },

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    }
};
