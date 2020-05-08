import express from "express";
const router = express.Router();

// These should be all scoped to owner of page

// GET: api/v1/writers PERMISSIONS: ADMIN
router.get("/", (_req, res) => {
  res.json({ message: "writers index" });
});

// POST: api/v1/writers/register
// POST: api/v1/writers/login
// PUT: api/v1/writers/update-password PERMISSIONS: USER or ADMIN
// DELETE: api/v1/writers/delete/{id} PERMISSIONS: USER or ADMIN

export default router;
