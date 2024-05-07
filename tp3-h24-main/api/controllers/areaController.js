"use strict";

const Area = require("../models/area");
const Route = require("../models/route");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createArea = async (req, res, next) => {
    const {name, description, gettingThere, lon, lat, user} = req.body

    const area = new Area({
        name: name,
        description: description,
        gettingThere: gettingThere,
        lon: lon,
        lat: lat,
        user: user
    })

    area.save()
        .then(result => {
            res.location("/areas/" + result._id)
            // Retourne le résultat au format JSON
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
};


exports.getAreas = async (req, res, next) => {
    Area.find()
        .then(areas => {

            res.status(200).json(areas)
        })
        .catch(err => {
            next(err)
        })
};

exports.getUserAreas = async (req, res, next) => {
    const userId = req.params.id
    Area.find({user: userId})
        .populate({
            path: "routes",
            model: Route,
        })
        .then(userArea => {
            if (userArea.length === 0) {
                const error = new Error('Aucun lieu trouvé pour cette utilisateur.');
                error.statusCode = 404;
                throw error;
            }
            // userArea.routes.sort((a, b) => a.grade.value - b.grade.value);
            res.status(200).json(userArea);
        })
        .catch(err => {
            next(err);
        });
};


exports.getArea = async (req, res, next) => {
    const areaId = req.params.id;
    Area.findById(areaId)
        .populate({
            path: "routes",
            model: Route,
        })
        .then(area => {
            if (!area) {
                const error = new Error('Le lieu n\'existe pas.');
                error.statusCode = 404;
                throw error;
            }
            area.routes.sort((a, b) => a.grade.value - b.grade.value);
            res.status(200).json(area);
        })
        .catch(err => {
            next(err);
        });
};


exports.updateArea = async (req, res, next) => {
    const areaId = req.params.id
    const {name, description, gettingThere, lon, lat} = req.body
    Area.findById(areaId)
        .then(area => {
            if (!area) {
                return res.status(404).json({message: "Le lieu n'existe pas."})
            }
            area.name = name
            area.description = description
            area.gettingThere = gettingThere
            area.lon = lon
            area.lat = lat
            return area.save()
        })
        .then(updatedArea => {
            res.status(200).json(updatedArea)
        })
        .catch(err => {
            next(err)
        })

}

exports.deleteArea = async (req, res, next) => {
    const areaId = req.params.id
    Area.findById(areaId)
        .then(route => {
            return Area.findByIdAndDelete(areaId)
        })
        .then(() => {
            res.status(204).send()
        })
        .catch(err => {
            next(err)
        })

}

exports.getRoutes = async (req, res, next) => {
    const areaId = req.params.id
    Route.find({areaId: areaId})
        .then(routeArea => {
            if (routeArea.length === 0) {
                const error = new Error('Aucune voie trouvé pour ce lieu.')
                error.statusCode = 404
                throw error
            }
            res.status(200).json(routeArea)
        })
        .catch(err => {
            next(err)
        })
};


