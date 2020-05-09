import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/api/v1";

const app: Application = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", router);
app.get("/", (_req, res) => {
  res.json({ message: "hello" });
});

// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("not found");
  error.status(404);
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
