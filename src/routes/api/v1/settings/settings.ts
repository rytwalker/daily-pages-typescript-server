import express, { Request, Response } from "express";
const router = express.Router();

// These should be all scoped to owner of settings

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "settings index" });
});

// POST: api/v1/settings/
// PUT: api/v1/writers/ PERMISSIONS: USER or ADMIN

// Setting get deleted when user is deleted. CASCADE i think?
export default router;
