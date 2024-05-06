"use strict";
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const url_base = process.env.URL + ":" + process.env.PORT;

const User = require("../models/user");

exports.logIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('loadedUser', email, password);

    let loadedUser;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                const error = new Error('Utilisateur non trouvée');
                error.statusCode = 404;
                throw error;
            }
            loadedUser = user;
            console.log('loadedUser', loadedUser);
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Mauvais mot de passe !');
                error.statusCode = 401;
                throw error;
            }
            // Création du token JWT
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    username: loadedUser.username,
                    level: loadedUser.level,
                    userId: loadedUser._id.toString()
                },
                // Utilise la clé secrète qui est dans le fichier .env
                process.env.SECRET_JWT,
                {expiresIn: '1h'}
            );
            res.status(200).json({token: token, user: loadedUser});
        })
        .catch(err => {
            if (!err.statusCode) err.statusCode = 500;
            res.status(err.statusCode).json({message: err.message, statusCode: err.statusCode});
        })
};

