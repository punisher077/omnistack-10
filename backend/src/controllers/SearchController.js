const Dev = require("../models/Dev");

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;
        const techsArray = techs.split(",").map(tech => tech.trim());

        const devs = await Dev.find({
            techs: {
                // se o usuario tem alguma tech da techsArray
                $in: techsArray
            },
            location: {
                // Encontrar os Devs proximos ao ponto (longitude, latitude) numa distancia de
                // no maximo 10km
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return res.json(devs);
    }
};
