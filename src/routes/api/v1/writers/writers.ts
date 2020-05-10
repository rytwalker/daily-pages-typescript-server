import express from "express";
import Writers from "../../../../controllers/Writers";

const router = express.Router();

// GET: api/v1/writers PERMISSIONS: ADMIN
router.get("/", Writers.getWriters);

// GET: api/v1/writers PERMISSIONS: USER or ADMIN
router.get("/:writerId", Writers.getWriter);

// POST: api/v1/writers/register
router.post("/signup", Writers.signup);

// POST: api/v1/writers/login
router.post("/login", Writers.login);

// PUT: api/v1/writers/:id PERMISSIONS: USER or ADMIN
router.put("/:id", Writers.updatePassword);

// DELETE: api/v1/writers/{id} PERMISSIONS: USER or ADMIN
router.delete("/:id", Writers.deleteWriter);

export default router;
