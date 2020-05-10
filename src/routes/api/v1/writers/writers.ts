import express, { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcryptjs";
import { v4 } from "uuid";
import { get } from "../../../../db/helpers/writers";
import { db } from "../../../../db/dbConfig";
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
router.post("/signup", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Bad Request: All field required." });
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

    res.status(201).json({ message: "logged in" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error: Something went wrong." });
  }
});
// PUT: api/v1/writers/update-password PERMISSIONS: USER or ADMIN
// DELETE: api/v1/writers/{id} PERMISSIONS: USER or ADMIN

export default router;
