"use strict";

const express = require("express");

const router = express.Router();

const areaController = require("../controllers/areaController");


// /areas/ => POST
router.post("/areas/", areaController.createArea);

// /areas/ => GET
router.get("/areas/", areaController.getAreas);

// /areas/my-areas => GET
router.get("/areas/my-areas/:id", areaController.getUserAreas);

// /areas/:areaId => GET
router.get("/areas/:id", areaController.getArea);

// /areas/:areaId/routes => GET
router.get("/areas/:id/routes", areaController.getRoutes);

// /routes => GET
router.get("/routes", areaController.getFilteredRoutes);

// /areas/:areaId => PUT
router.put("/areas/:id", areaController.updateArea);

// /areas/:areaId => DELETE
router.delete("/areas/:id", areaController.deleteArea);

module.exports = router;

