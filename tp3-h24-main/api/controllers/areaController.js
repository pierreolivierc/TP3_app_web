"use strict";

const Area = require("../models/area");
const Route = require("../models/route");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createArea = async (req, res, next) => {
    const {name, description, gettingThere, lon, lat} = req.body

    const user = new User({
        name: name,
        description: description,
        gettingThere: gettingThere,
        lon: lon,
        lat: lat
    })
    user.save()
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


};

exports.getArea = async (req, res, next) => {
const areaId = req.params.id
    Area.findById(areaId)
        .then(area => {
            if (!area) {
                const error = new Error('L\'utilisateur n\'existe pas.')
                error.statusCode = 404
                throw error
            }
            res.status(200).json(area)
        })
        .catch(err => {
            next(err)
        })

};

exports.updateArea = async (req, res, next) => {


}

exports.deleteArea = async (req, res, next) => {


}

exports.getRoutes = async (req, res, next) => {


};


