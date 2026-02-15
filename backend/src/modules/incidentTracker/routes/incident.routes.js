
const express = require("express");
const router = express.Router();
const createIncident = require("../controller/createIncident.controller");
const {authMiddleware} =require('../../../middlewares/auth.middleware');
const getIncidents=require('../controller/getIncidents.controller');
const getIncidentById=require('../controller/getIncidentById.controller');
const updateIncident=require('../controller/updateIncident.controller');
// POST /api/incidents  → Create a new incident
router.post("/",authMiddleware,createIncident);

//GET /api/incidents (pagination, filtering, sorting
router.get("/",authMiddleware,getIncidents)

//GET /api/incidents/:id
router.get("/:id", authMiddleware, getIncidentById);

//PATCH /api/incidents/:id
router.patch("/:id",authMiddleware,updateIncident)
//Use proper validation, indexing where appropriate, and parameterized queries/ORM safety

module.exports = router;