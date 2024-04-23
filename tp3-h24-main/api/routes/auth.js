"use strict";

const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

// signin/ => POST
router.post("/signIn", authController.logIn);




module.exports = router;
