"use strict";

const express = require("express");

const router = express.Router();

const routeController = require("../controllers/routeController");


// /routes/ => POST
router.post("/routes/",  routeController.createRoute);

// /routes/ => GET
router.get("/routes/", routeController.getRoutes);

// /routes/my-routes => GET
router.get("/routes/my-routes/:id", routeController.getUserRoutes);

// /routes/:routeId => GET
router.get("/routes/:id", routeController.getRoute);

// /routes/:routeId => PUT
router.put("/routes/:id",  routeController.updateRoute);

// /routes/:routeId => DELETE
router.delete("/routes/:id",  routeController.deleteRoute);


module.exports = router;

