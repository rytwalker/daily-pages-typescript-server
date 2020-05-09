exports.up = function (knex, Promise) {
  return knex.schema.createTable("writers", (table) => {
    table.uuid("id").primary();
    table.string("email");
    table.string("password");
    table.string("first_name");
    table.string("last_name");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("writers");
};
