import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
import { hash, compare } from "bcryptjs";
import { get, remove, update } from "../db/helpers/writers";
import { db } from "../db/dbConfig";
import { errorHandler } from "../helpers/errorHandler";
import { isValidEmail } from "../helpers/isValidEmail";
import { generateToken } from "../helpers/generateToken";

const customErrorMessage: string =
  "located in: ./src/routes/api/v1/writers.ts\n";

export default class Writers {
  static async getWriters(_req: Request, res: Response, next: NextFunction) {
    try {
      const writers = await get();
      res.status(200).json(writers);
    } catch (error) {
      console.log(error);
      next();
    }
  }

  static async getWriter(req: Request, res: Response, next: NextFunction) {
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

  static async signup(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Bad Request: All field required." });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Bad Request: Email must be a valid email address." });
    }

    try {
      const emailExists = await db("writers").where({ email }).first();

      if (emailExists) {
        return res
          .status(401)
          .json({ message: "There is already an account with this email" });
      }

      const hashedPassword = await hash(password, 12);
      const writerId = v4();
      const [id] = await db("writers").insert(
        {
          id: writerId,
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashedPassword
        },
        "id"
      );
      await db("settings").insert({ writer_id: id });

      res.status(201).json(id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error: Something went wrong." });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Bad Request: All field required." });
    }

    try {
      const writer = await db("writers").where({ email }).first();
      if (!writer) {
        return res.status(400).json("Bad request: email or password is wrong.");
      }

      const passwordsMatch = await compare(password, writer.password);

      if (!passwordsMatch) {
        return res.status(400).json("Bad request: email or password is wrong.");
      }
      const token = generateToken(writer);
      res.status(201).json({ message: "logged in", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error: Something went wrong." });
    }
  }

  static async updatePassword(req: Request, res: Response) {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return errorHandler(
        customErrorMessage,
        res,
        400,
        "Bad Request: Invalid data"
      );
    }

    try {
      const hashedPassword = await hash(password, 12);
      const updatedUser = await update({ password: hashedPassword }, id);
      if (!updatedUser) {
        return errorHandler(
          customErrorMessage,
          res,
          404,
          "Not Found: User doesn't exisit."
        );
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      errorHandler(error, res, 500, "Server error: Something went wrong.");
    }
  }

  static async deleteWriter(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const count = await remove(id);
      if (count) {
        res.status(200).json({ message: "Writer successfully removed" });
      } else {
        errorHandler(customErrorMessage, res, 404, "404: Writer not found.");
      }
    } catch (error) {
      errorHandler(error, res, 500, "Server error: Something went wrong.");
    }
  }
}
