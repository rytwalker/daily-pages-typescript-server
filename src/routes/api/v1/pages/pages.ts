import express, { Request, Response } from "express";
const router = express.Router();

// GET: api/v1/pages PERMISSIONS: USER or ADMIN
router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "GET: pages index" });
});

// POST: api/v1/pages PERMISSIONS: USER or ADMIN
router.post("/", (req: Request, res: Response) => {
  const { content, date } = req.body;
  const page = {
    content,
    date
  };
  res.status(201).json({ message: "POST: pages index", page });
});

// PUT: api/v1/pages/update/{id} PERMISSIONS: USER or ADMIN
router.put("/:pageId", (_req: Request, res: Response) => {
  res.status(201).json({ message: "POST: pages index" });
});

// DELETE: api/v1/pages/delete/{id} PERMISSIONS: USER or ADMIN
router.delete("/:pageId", (_req: Request, res: Response) => {
  res.status(201).json({ message: "POST: pages index" });
});

export default router;
