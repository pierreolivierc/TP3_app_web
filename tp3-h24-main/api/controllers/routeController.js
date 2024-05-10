"use strict";

const Route = require("../models/route");
const dotenv = require("dotenv");
const User = require("../models/user");
const Area = require("../models/area");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createRoute = async (req, res, next) => {
    const {name, type, grade, description, approach, descent, areaId, userId} = req.body;

    try {
        await areaUserExist(areaId, userId)

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
    try {
        const routes = await Route.find()
        const routeLinks = routes.map(route => {
            return {
                ...route.toJSON(),
                links: [
                    {rel: 'self', method: 'GET', href: `${url_base}/routes/${route._id}`},
                    {rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${route._id}`},
                    {rel: 'update', method: 'PUT', href: `${url_base}/routes/${route._id}`}
                ]
            };
        });
        res.status(200).json(routeLinks)
            .catch(err => {
                next(err)
            })
    } catch (err) {
        next(err);
    }
};

exports.getUserRoutes = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const routes = await Route.find({ user: userId }).populate("area").exec(); // Utilisez populate pour peupler les données de la région
        if (routes.length === 0) { // Vérifiez s'il n'y a aucune route trouvée pour cet utilisateur
            const error = new Error("Aucune voie trouvée pour cet utilisateur.");
            error.statusCode = 404;
            throw error;
        }
        const sortedRoutes = routes.sort((a, b) => {
            return a.grade.value - b.grade.value; // Triez les routes en fonction de la valeur de leur grade
        });
        const routeLinks = sortedRoutes.map(route => {
            return {
                ...route.toJSON(),
                links: [
                    { rel: 'self', method: 'GET', href: `${url_base}/routes/${route._id}` },
                    { rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${route._id}` },
                    { rel: 'update', method: 'PUT', href: `${url_base}/routes/${route._id}` }
                ]
            };
        });
        res.status(200).json(routeLinks);
    } catch (err) {
        next(err);
    }
};


exports.getRoute = async (req, res, next) => {
    const routeId = req.params.id;
    try {
        const route = await Route.findById(routeId)
            .populate({
                path: "area",
                model: Area,
            })
            .populate({
                path: "user",
                model: User,
            })
            .exec();

        if (!route) {
            const error = new Error("La route n'existe pas.");
            error.statusCode = 404;
            throw error;
        }

        const routeLinks = {
            ...route.toJSON(),
            links: [
                { rel: 'self', method: 'GET', href: `${url_base}/routes/${route._id}` },
                { rel: 'delete', method: 'DELETE', href: `${url_base}/routes/${route._id}` },
                { rel: 'update', method: 'PUT', href: `${url_base}/routes/${route._id}` }
            ]
        };

        res.status(200).json(routeLinks);
    } catch (err) {
        next(err);
    }
};



exports.updateRoute = async (req, res, next) => {
    const routeId = req.params.id
    const {name, type, grade, description, approach, descent, areaId, userId} = req.body;
    try {
        await areaUserExist(areaId, userId)

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

    } catch (error) {
        // Gérer les erreurs
        next(error);
    }

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


async function areaUserExist(areaId, userId) {

    const area = await Area.findById(areaId);
    if (!area) {
        const error = new Error("Le lieu n'existe pas.");
        error.statusCode = 422;
        throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("L'utilisateur n'existe pas.");
        error.statusCode = 422;
        throw error;
    }
}


