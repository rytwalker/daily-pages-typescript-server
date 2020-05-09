exports.up = function (knex, Promise) {
  return knex.schema.createTable("pages", (table) => {
    table.uuid("id").primary();
    table.string("content");
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
  return knex.schema.dropTableIfExists("pages");
};
