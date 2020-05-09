import express, { Request, Response, NextFunction } from "express";
import { get } from "../../../../db/helpers/writers";
const router = express.Router();

// These should be all scoped to owner of page

// GET: api/v1/writers PERMISSIONS: ADMIN
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const writers = await get();
    res.status(200).json(writers);
  } catch (error) {
    console.log(error);
    next();
  }
});

router.get(
  "/:writerId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const writerId = req.params.writerId;
      if (writerId) {
        const writer = await get(writerId);
        res.status(200).json(writer);
      }
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

// POST: api/v1/writers/register
// POST: api/v1/writers/login
// PUT: api/v1/writers/update-password PERMISSIONS: USER or ADMIN
// DELETE: api/v1/writers/{id} PERMISSIONS: USER or ADMIN

export default router;
