"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const url_base = process.env.URL + ":" + process.env.PORT;

exports.createUser = (req, res, next) => {
    const {username, email, password} = req.body

    const user = new User({
        username: username,
        email: email,
        password: password
    })
    user.save()
        .then(result => {
            res.location("/users/" + result._id)
            // Retourne le résultat au format JSON
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
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






