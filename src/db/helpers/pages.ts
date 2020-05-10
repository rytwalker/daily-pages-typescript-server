import { db } from "../dbConfig";
import chalk from "chalk";

const errorLog = (error: any) => {
  console.log(chalk.red(error));
  console.log(chalk.red("located in: ./src/db/helpers.pages.ts\n"));
};

export const get = async (id: string | null = null) => {
  try {
    if (id) {
      const page = await db("pages")
        .select("id", "content", "created_at", "updated_at", "writer_id")
        .where({ id })
        .first();

      return page;
    }

    return await db("pages");
  } catch (error) {
    errorLog(error);
  }
};

export const getWriterPages = async (writerId: string) => {
  try {
    return await db("pages")
      .select("id", "content", "created_at", "updated_at")
      .where({ writer_id: writerId });
  } catch (error) {
    errorLog(error);
  }
};

export const insert = async (page: any) => {
  try {
    const [id] = await db("pages").insert(page, "id");
    return get(id);
  } catch (error) {
    errorLog(error);
  }
};

export const update = async (changes: any, id: any) => {
  try {
    await db("pages").where({ id }).update(changes);
    return get(id);
  } catch (error) {
    errorLog(error);
  }
};

export const remove = async (id: any) => {
  try {
    const count = await db("pages").where({ id }).del();
    return count;
  } catch (error) {
    errorLog(error);
  }
};
