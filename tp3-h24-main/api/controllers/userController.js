"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createUser = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // Vérifier si l'email est déjà utilisé
    User.findOne({email: email})
        .then(existingUser => {
            if (existingUser) {
                const error = new Error('Email déjà utilisé. Veuillez choisir un autre email.');
                error.statusCode = 409;
                throw error;
            } else {
                return bcrypt.hash(password, 12);
            }
        })
        .then((hashedPassword) => {
            const user = new User({
                email: email,
                username: username,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: "Utilisateur créé avec succès",
                user: result
            });
        })
        .catch(err => {
            next(err);
        });
};


exports.getUser = (req, res, next) => {
    const userId = req.params.email
    User.findById(userId)
        .then(user => {
            if (!user) {
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






