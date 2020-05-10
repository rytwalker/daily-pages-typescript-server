import express, { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import { v4 } from "uuid";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import { get, remove, update } from "../../../../db/helpers/writers";
import { db } from "../../../../db/dbConfig";
const router = express.Router();

function isValidEmail(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const errorHandler = (
  error: any,
  res: Response,
  statusCode: number,
  message: string
): void => {
  console.log(chalk.red(error));
  res.status(statusCode).json({ message });
};

const customErrorMessage: string =
  "located in: ./src/routes/api/v1/writers.ts\n";

function generateToken(writer: any) {
  const payload = {
    writerId: writer.id,
    email: writer.email
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret!, options);
}

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
router.post("/signup", async (req: Request, res: Response) => {
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
});

// POST: api/v1/writers/login
router.post("/login", async (req: Request, res: Response) => {
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
});

// PUT: api/v1/writers/update-password PERMISSIONS: USER or ADMIN
router.put("/:id", async (req: Request, res: Response) => {
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
});
// DELETE: api/v1/writers/{id} PERMISSIONS: USER or ADMIN
router.delete("/:id", async (req: Request, res: Response) => {
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
});

export default router;
