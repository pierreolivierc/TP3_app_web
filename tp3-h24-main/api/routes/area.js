"use strict";

const express = require("express");

const router = express.Router();

const areaController = require("../controllers/areaController");


// /areas/ => POST
router.post("/areas/", areaController.createArea);

// /areas/ => GET
router.get("/areas/", areaController.getAreas);

// /areas/my-areas => GET
router.get("/areas/my-areas", areaController.getAreas);

// /areas/:areaId => GET
router.get("/areas/:areaId", areaController.getArea);

// /areas/:areaId/routes => GET
router.get("/areas/:areaId/routes", areaController.getRoutes);


// /areas/:areaId => PUT
router.put("/areas/:areaId", areaController.updateArea);

// /areas/:areaId => DELETE
router.delete("/areas/:areaId", areaController.deleteArea);

module.exports = router;

