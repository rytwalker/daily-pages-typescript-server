import express, { Request, Response } from "express";
const router = express.Router();

// These should be all scoped to owner of page

// GET: api/v1/writers PERMISSIONS: ADMIN
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "writers index" });
});

router.get("/:userId", (_req: Request, res: Response) => {
  res.status(200).json({ message: "writer" });
});

// POST: api/v1/writers/register
// POST: api/v1/writers/login
// PUT: api/v1/writers/update-password PERMISSIONS: USER or ADMIN
// DELETE: api/v1/writers/{id} PERMISSIONS: USER or ADMIN

export default router;
