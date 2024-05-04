"use strict";

const Route = require("../models/route");
const dotenv = require("dotenv");
const User = require("../models/user");
const Area = require("../models/area");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createRoute = async (req, res, next) => {
    const Route = require('../models/Route'); // Importer le modèle de route
    const {name, type, grade, description, approach, descent, areaId, userId} = req.body;

    try {
        const route = new Route({
            name: name,
            type: type,
            grade: grade,
            description: description,
            approach: approach,
            descent: descent,
            area: areaId,
            user: userId,
        });

        // Enregistrer la route dans la base de données
        const savedRoute = await route.save();

        // Répondre avec la route créée
        res.status(201).json(savedRoute);
    } catch (error) {
        // Gérer les erreurs
        next(error);
    }

};


exports.getRoutes = async (req, res, next) => {
    Route.find()
        .then(routes => {

            res.status(200).json(routes)
        })
        .catch(err => {
            next(err)
        })
};

exports.getUserRoutes = async (req, res, next) => {
const userId = req.params.id
    Route.find({userId : userId})
        .then(userRoute => {
            if (userRoute.length === 0) {
                const error = new Error('Aucune voie trouvé pour cette utilisateur.')
                error.statusCode = 404
                throw error
            }
            res.status(200).json(userRoute)
        })
        .catch(err => {
            next(err)
        })

};

exports.getRoute = async (req, res, next) => {
    const routeId = req.params.id
    Route.findById(routeId)
        .then(route => {
            if (!route) {
                const error = new Error('La route n\'existe pas.')
                error.statusCode = 404
                throw error
            }
            res.status(200).json(route)
        })
        .catch(err => {
            next(err)
        })

};

exports.updateRoute = async (req, res, next) => {
    const routeId = req.params.id
    const {name, type, grade, description, approach, descent, areaId, userId} = req.body;
    Route.findById(routeId)
        .then(route => {
            if (!route) {
                return res.status(404).json({message: "L'utilisateur n'existe pas."})
            }
            route.name = name
            route.type = type
            route.grade = grade
            route.description = description
            route.approach = approach
            route.descent = descent
            route.area = areaId
            route.user = userId
            return route.save()
        })
        .then(updatedRoute => {
            res.status(200).json(updatedRoute)
        })
        .catch(err => {
            next(err)
        })

}

exports.deleteRoute = async (req, res, next) => {
    const routeId = req.params.id
    Route.findById(routeId)
        .then(route => {
            return Route.findByIdAndDelete(routeId)
        })
        .then(() => {
            res.status(204).send()
        })
        .catch(err => {
            next(err)
        })
}




