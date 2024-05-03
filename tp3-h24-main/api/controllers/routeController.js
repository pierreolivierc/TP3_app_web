"use strict";

const Route = require("../models/route");
const dotenv = require("dotenv");
const User = require("../models/user");

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


};

exports.getUserRoutes = async (req, res, next) => {


};

exports.getRoute = async (req, res, next) => {


};

exports.updateRoute = async (req, res, next) => {


}

exports.deleteRoute = async (req, res, next) => {

}




