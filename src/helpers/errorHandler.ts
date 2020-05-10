import { Response } from "express";
import chalk from "chalk";

export const errorHandler = (
  error: any,
  res: Response,
  statusCode: number,
  message: string
): void => {
  console.log(chalk.red(error));
  res.status(statusCode).json({ message });
};
