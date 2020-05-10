import { db } from "../dbConfig";
import chalk from "chalk";

const errorLog = (error: any) => {
  console.log(chalk.red(error));
  console.log(chalk.red("located in: ./src/db/helpers.writers.ts\n"));
};

export const get = async (id: string | null = null) => {
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
          "p.content",
          "p.created_at",
          "p.updated_at",
          "s.minimalizm",
          "s.time_limit"
        )
        .where({ "w.id": id });

      const writer = {
        id,
        email: data[0].email,
        firstName: data[0].first_name,
        lastName: data[0].last_name,
        settings: {
          minimalizm: data[0].minimalizm,
          timeLimit: data[0].time_limit
        },
        pages: data.map((d) => ({
          id: d.id,
          content: d.content,
          createdAt: d.created_at,
          updatedAt: d.updated_at
        }))
      };
      return writer;
    }

    const allWritersData = await db("writers as w")
      .join("settings as s", "w.id", "s.writer_id")
      .select(
        "w.id",
        "w.email",
        "w.first_name",
        "w.last_name",
        "s.minimalizm",
        "s.time_limit"
      );

    const pages = await db("pages");

    const writers = allWritersData.map((writer) => {
      return {
        id: writer.id,
        email: writer.email,
        firstName: writer.first_name,
        last_name: writer.last_name,
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
