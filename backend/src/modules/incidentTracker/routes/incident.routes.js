
const express = require("express");
const router = express.Router();
const createIncident = require("../controller/createIncident.controller");
const {authMiddleware} =require('../../../middlewares/auth.middleware');


// POST /api/incidents  → Create a new incident
router.post("/",authMiddleware,createIncident);

//GET /api/incidents (pagination, filtering, sorting

//GET /api/incidents/:id
//PATCH /api/incidents/:id
//Use proper validation, indexing where appropriate, and parameterized queries/ORM safety

module.exports = router;