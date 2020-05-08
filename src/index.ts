import express from "express";
import router from "./routes/api/v1";

function main() {
  const app = express();

  app.use("/", router);

  app.get("/", (_req, res) => {
    res.json({ message: "hello" });
  });

  const PORT: string | number = process.env.PORT || 4000;

  app.listen(4000, () => {
    console.log(`\n App is running on Port: ${PORT} \n`);
  });
}

main();
