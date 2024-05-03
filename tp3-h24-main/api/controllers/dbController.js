"use strict";

const User = require("../models/user");
const Route = require("../models/route");

const route_seeds = require("../seeds/route");

let result = {};

exports.seed = (req, res, next) =>{

    User.deleteMany({})
        // .then(() => Route.deleteMany({}))
        // .then(() => Route.insertMany(route_seed))
        .then(() => {
            res.send("Base de données réinitialisée avec succès !");
        })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });




};