exports.up = function (knex, Promise) {
  return knex.schema.table("writers", (table) => {
    // token version
    table.integer("tokenVersion").unsigned().default(0).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("writers", (table) => {
    table.dropColumn("tokenVersion");
  });
};
