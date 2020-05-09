exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("writers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("writers").insert([
        {
          id: "00d49814-f77b-4960-82b1-b4ad4b7aff7d",
          email: "rytwalker@gmail.com",
          first_name: "Ryan",
          last_name: "Walker",
          password: "password"
        },
        {
          id: "d25a829c-a865-4384-b7e4-53dc1fc2f60b",
          email: "test@gmail.com",
          first_name: "Ryan",
          last_name: "Walker",
          password: "password"
        },
        {
          id: "6bd12bbf-825f-4445-a6c0-d3dd5aa04712",
          email: "test2@gmail.com",
          first_name: "Ryan",
          last_name: "Walker",
          password: "password"
        }
      ]);
    });
};
