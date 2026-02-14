
const express = require("express");
const router = express.Router();
const { createIncident } = require("../controller/incident.controller");
const {authMiddleware}=require('../../../middlewares/auth.middleware');

// POST /api/incidents  → Create a new incident
router.post("/", authMiddleware,createIncident);
