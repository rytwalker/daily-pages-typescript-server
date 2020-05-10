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
      const data = await db("writers as w")
        .join("pages as p", "w.id", "p.writer_id")
        .join("settings as s", "w.id", "s.writer_id")
        .select(
          "p.id",
          "w.email",
          "w.first_name",
          "w.last_name",
          "w.tokenVersion",
          "p.content",
          "p.created_at",
          "p.updated_at",
          "s.minimalizm",
          "s.time_limit"
        )
        .where({ "w.id": id });

      const writer: Writer = {
        id,
        email: data[0].email,
        firstName: data[0].first_name,
        lastName: data[0].last_name,
        tokenVersion: data[0].tokenVersion,
        settings: {
          minimalizm: data[0].minimalizm,
          timeLimit: data[0].time_limit
        }
      };
      const pages: Page[] = data.map((d) => ({
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
