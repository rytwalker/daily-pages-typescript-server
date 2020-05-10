import express, { Request, Response } from "express";
import { get, update } from "../../../../db/helpers/settings";
const router = express.Router();

// These should be all scoped to owner of settings

router.get("/", async (_req: Request, res: Response) => {
  const settings = await get();
  res.status(200).json(settings);
});

// POST: api/v1/settings/ created when user is created
// PUT: api/v1/writers/ PERMISSIONS: USER or ADMIN
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const count = await update(id, req.body);
    if (count) {
      res.status(200).json({ message: "settings updated" });
    } else {
      console.log("error");
      res.status(400).json({ message: "Bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error: Something went wrong" });
  }
});

export default router;
