exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("pages")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("pages").insert([
        {
          id: "f878ca6a-3b0d-4f7d-9f00-54a9142e3fae",
          writer_id: "00d49814-f77b-4960-82b1-b4ad4b7aff7d",
          content: "really bad example"
        },
        {
          id: "795edfbc-f3e7-4595-92e6-d39f3f718613",
          writer_id: "00d49814-f77b-4960-82b1-b4ad4b7aff7d",
          content: "really bad example2"
        },
        {
          id: "a207c5bb-594c-4243-9f8d-75119a636e80",
          writer_id: "d25a829c-a865-4384-b7e4-53dc1fc2f60b",
          content: "other guy bad example"
        }
      ]);
    });
};
