import express from "express";
const router = express.Router();

// These should be all scoped to owner of page

// GET: api/v1/pages PERMISSIONS: USER or ADMIN
router.get("/", (_req, res) => {
  res.json({ message: "pages index" });
});

// POST: api/v1/pages/new PERMISSIONS: USER or ADMIN
// PUT: api/v1/pages/update/{id} PERMISSIONS: USER or ADMIN
// DELETE: api/v1/pages/delete/{id} PERMISSIONS: USER or ADMIN

export default router;
