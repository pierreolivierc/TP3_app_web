"use strict";

const dotenv = require("dotenv");
dotenv.config();
const url_base = process.env.URL + ":" + process.env.PORT;

const User = require("../models/user");

exports.logIn = (req, res, next) => {
    const userId = req.params.email
    User.findById(userId)
        .then(user => {
            if (req.params.password !== user.password) {
                const error = new Error('L\'utilisateur n\'existe pas.')
                error.statusCode = 404
                throw error
            }
            res.status(200).json(user)
        })
        .catch(err => {
            next(err)
        })

};

