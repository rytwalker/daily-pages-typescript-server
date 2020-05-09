exports.up = function (knex, Promise) {
  return knex.schema.createTable("settings", (table) => {
    table.boolean("minimalizm").default(false);
    // time in miliseconds
    table.integer("time_limit").default(1500000);
    table
      .uuid("writer_id")
      .references("id")
      .inTable("writers")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("settings");
};
