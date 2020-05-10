import { db } from "../dbConfig";
import chalk from "chalk";
import { Writer } from "../../types/Writer";
import { Page } from "../../types/Page";

const errorLog = (error: any) => {
  console.log(chalk.red(error));
  console.log(chalk.red("located in: ./src/db/helpers.writers.ts\n"));
};

export const get = async (
  id: string | null = null
): Promise<Writer | Writer[] | void> => {
  try {
    if (id) {
      const writerData = await db("writers as w")
        .join("settings as s", "w.id", "s.writer_id")
        .select(
          "w.email",
          "w.first_name",
          "w.last_name",
          "w.tokenVersion",
          "s.minimalizm",
          "s.time_limit"
        )
        .where({ "w.id": id })
        .first();

      const writer: Writer = {
        id,
        email: writerData.email,
        firstName: writerData.first_name,
        lastName: writerData.last_name,
        tokenVersion: writerData.tokenVersion,
        settings: {
          minimalizm: writerData.minimalizm,
          timeLimit: writerData.time_limit
        }
      };
      const pageData = await db("pages").where({ writer_id: id });
      const pages: Page[] = pageData.map((d) => ({
        id: d.id,
        content: d.content,
        createdAt: d.created_at,
        updatedAt: d.updated_at
      }));

      writer.pages = pages;
      return writer;
    }

    const allWritersData = await db("writers as w")
      .join("settings as s", "w.id", "s.writer_id")
      .select(
        "w.id",
        "w.email",
        "w.first_name",
        "w.last_name",
        "w.tokenVersion",
        "s.minimalizm",
        "s.time_limit"
      );

    const pages = await db("pages");

    const writers: Writer[] = allWritersData.map((writer) => {
      return {
        id: writer.id,
        email: writer.email,
        firstName: writer.first_name,
        lastName: writer.last_name,
        tokenVersion: writer.tokenVersion,
        settings: {
          minimalizm: writer.minimalizm,
          timeLimit: writer.time_limit
        },
        pages: pages.filter((page) => page.writer_id == writer.id)
      };
    });
    return writers;
  } catch (error) {
    console.log(chalk.red(error));
    console.log(chalk.red("located in: ./src/db/helpers.writers.ts\n"));
  }
};

export const update = async (changes: any, id: any) => {
  try {
    await db("writers").where({ id }).update(changes);
    return get(id);
  } catch (error) {
    errorLog(error);
  }
};

export const remove = async (id: any) => {
  try {
    const count = await db("writers").where({ id }).del();
    return count;
  } catch (error) {
    errorLog(error);
  }
};
