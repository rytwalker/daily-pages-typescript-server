import express, { Request, Response } from "express";
import { get, insert, update, remove } from "../../../../db/helpers/pages";
import chalk from "chalk";
import { v4 } from "uuid";
const router = express.Router();

const errorHandler = (
  error: any,
  res: Response,
  statusCode: number,
  message: string
): void => {
  console.log(chalk.red(error));
  res.status(statusCode).json({ message });
};

const customErrorMessage: string = "located in: ./src/routes/api/v1/pages.ts\n";

// GET: api/v1/pages PERMISSIONS: USER or ADMIN
router.get("/", async (_req: Request, res: Response) => {
  try {
    const pages = await get();
    res.status(200).json(pages);
  } catch (error) {
    errorHandler(error, res, 500, "Server error: Something went wrong.");
  }
});

// GET: api/v1/pages/:pageId PERMISSIONS: USER or ADMIN
router.get("/:pageId", async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    if (pageId) {
      const page = await get(pageId);
      if (page) {
        res.status(200).json(page);
      } else {
        errorHandler(
          customErrorMessage,
          res,
          404,
          "404: Daily Page not found."
        );
      }
    }
  } catch (error) {
    errorHandler(error, res, 500, "Server error: Something went wrong.");
  }
});

// POST: api/v1/pages PERMISSIONS: USER or ADMIN
router.post("/", async (req: Request, res: Response) => {
  try {
    const { content, writerId } = req.body;
    if (content && writerId) {
      const page = {
        content,
        writer_id: writerId,
        id: v4()
      };
      const response = await insert(page);
      if (response) {
        res.status(201).json(response);
      } else {
        errorHandler(
          customErrorMessage,
          res,
          500,
          "Server Error: Something went wrong."
        );
      }
    } else {
      errorHandler(customErrorMessage, res, 400, "Bad Request: Invalid data");
    }
  } catch (error) {
    errorHandler(error, res, 500, "Server error: Something went wrong.");
  }
});

// PUT: api/v1/pages/update/{id} PERMISSIONS: USER or ADMIN
router.put("/:pageId", async (req: Request, res: Response) => {
  const { pageId } = req.params;
  const { content } = req.body;

  if (!content) {
    return errorHandler(
      customErrorMessage,
      res,
      400,
      "Bad Request: Invalid data"
    );
  }

  try {
    const updatedPage = await update({ content }, pageId);
    if (!updatedPage) {
      return errorHandler(
        customErrorMessage,
        res,
        404,
        "Not Found: Daily Page doesn't exisit."
      );
    }

    res.status(200).json(updatedPage);
  } catch (error) {
    errorHandler(error, res, 500, "Server error: Something went wrong.");
  }
});

// DELETE: api/v1/pages/delete/{id} PERMISSIONS: USER or ADMIN
router.delete("/:pageId", async (req: Request, res: Response) => {
  const { pageId } = req.params;
  try {
    const count = await remove(pageId);
    if (count) {
      res.status(200).json({ message: "Daily Page successfully removed" });
    } else {
      errorHandler(customErrorMessage, res, 404, "404: Daily Page not found.");
    }
  } catch (error) {
    errorHandler(error, res, 500, "Server error: Something went wrong.");
  }
});

export default router;
