const axios = require("axios");
const Dev = require("../models/Dev");

const stringTechsToArray = techs => techs.split(",").map(tech => tech.trim());

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        };

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const techsArray = stringTechsToArray(techs);

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
    },

    async destroy(req, res) {
        const { id } = req.params;
        const dev = await Dev.findByIdAndDelete(req.params.id);
        return res.sendStatus(dev ? 200 : 404);
    },

    async update(req, res) {
        const { id } = req.params;
        let devAtributes = req.body;
        console.log(devAtributes);

        if (devAtributes.techs) {
            devAtributes = {
                ...devAtributes,
                techs: stringTechsToArray(devAtributes.techs)
            };
        }
        if (devAtributes.github_username) {
            const git_response = await axios.get(
                `https://api.github.com/users/${devAtributes.github_username}`
            );

            const { avatar_url, name = login, bio } = git_response.data;
            devAtributes = {
                ...devAtributes,
                avatar_url,
                name,
                bio
            };
        }
        const dev = await Dev.findByIdAndUpdate(id, devAtributes, {
            new: true
        });
        return res.json(dev);
    }
};
