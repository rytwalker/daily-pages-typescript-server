import express from "express";
import router from "./routes/api/v1";

const app = express();

app.use("/", router);

app.get("/", (_req, res) => {
  res.json({ message: "hello" });
});

export default app;
