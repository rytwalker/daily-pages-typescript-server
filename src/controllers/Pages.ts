import { Request, Response } from "express";
import { v4 } from "uuid";
import {
  get,
  getWriterPages,
  insert,
  remove,
  update
} from "../db/helpers/pages";
import { errorHandler } from "../helpers/errorHandler";

const customErrorMessage: string = "located in: ./src/routes/api/v1/pages.ts\n";

export default class Pages {
  // GET ALL PAGES ASSOCIATED WITH USER or TODO: ADMIN GET ALL
  static async getPages(req: Request, res: Response) {
    try {
      const { writerId } = req.writerData as any;
      const pages = await getWriterPages(writerId);
      res.status(200).json(pages);
    } catch (error) {
      errorHandler(error, res, 500, "Server error: Something went wrong.");
    }
  }

  // GET INDIVIDUAL PAGE
  static async getPage(req: Request, res: Response) {
    try {
      const { pageId } = req.params;
      const { writerId } = req.writerData as any;
      if (pageId) {
        const page = await get(pageId);
        if (page) {
          if (page.writer_id === writerId) {
            res.status(200).json(page);
          } else {
            errorHandler(customErrorMessage, res, 401, "401: unauthorized");
          }
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
  }

  // ADD NEW PAGE
  static async addPage(req: Request, res: Response) {
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
  }

  // UPDATES PAGE
  static async updatePage(req: Request, res: Response) {
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
  }

  // DELETE
  static async deletePage(req: Request, res: Response) {
    const { pageId } = req.params;
    try {
      const count = await remove(pageId);
      if (count) {
        res.status(200).json({ message: "Daily Page successfully removed" });
      } else {
        errorHandler(
          customErrorMessage,
          res,
          404,
          "404: Daily Page not found."
        );
      }
    } catch (error) {
      errorHandler(error, res, 500, "Server error: Something went wrong.");
    }
  }
}
