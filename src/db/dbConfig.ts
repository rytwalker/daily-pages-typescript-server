import knex from "knex";
const environment: string = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
export const db = knex(config);
