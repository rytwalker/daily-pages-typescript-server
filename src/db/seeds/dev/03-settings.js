exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("settings")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("settings").insert([
        { writer_id: "00d49814-f77b-4960-82b1-b4ad4b7aff7d" },
        { writer_id: "d25a829c-a865-4384-b7e4-53dc1fc2f60b" },
        { writer_id: "6bd12bbf-825f-4445-a6c0-d3dd5aa04712" }
      ]);
    });
};
