import { Request, Response } from "express";
import { get, update } from "../db/helpers/settings";

export default class Settings {
  static async getAllWriterSettings(_req: Request, res: Response) {
    const settings = await get();
    res.status(200).json(settings);
  }

  static async updateSettings(req: Request, res: Response) {
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
  }
}
