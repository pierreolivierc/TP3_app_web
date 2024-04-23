"use strict";

const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");


// /users/ => POST
router.post("/users/",  userController.createUser);

// /users/:utilisateurId => GET (utilisateur authentifié)
router.get("/users/:userId", userController.getUser);


module.exports = router;

