import express from "express";
const router = express.Router();

// These should be all scoped to owner of settings

router.get("/", (_req, res) => {
  res.json({ message: "settings index" });
});

// POST: api/v1/settings/create
// PUT: api/v1/writers/update-settings PERMISSIONS: USER or ADMIN

// Setting get deleted when user is deleted. CASCADE i think?
export default router;
