import { db } from "../dbConfig";
import chalk from "chalk";

const errorLog = (error: any) => {
  console.log(chalk.red(error));
  console.log(chalk.red("located in: ./src/db/helpers.pages.ts\n"));
};

export const get = async () => {
  try {
    return await db("settings");
  } catch (error) {
    errorLog(error);
  }
};

export const update = async (id: any, changes: any) => {
  try {
    return await db("settings").where({ writer_id: id }).update(changes);
  } catch (error) {
    errorLog(error);
  }
};
