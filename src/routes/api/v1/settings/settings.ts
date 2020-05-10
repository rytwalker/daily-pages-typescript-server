import express from "express";
import Settings from "../../../../controllers/Settings";

const router = express.Router();

// ADMIN route
router.get("/", Settings.getAllWriterSettings);

// PUT: api/v1/writers/ PERMISSIONS: USER or ADMIN
router.put("/:id", Settings.updateSettings);

export default router;
