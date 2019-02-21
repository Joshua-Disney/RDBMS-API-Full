exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Disney", cohort_id: 1 },
        { name: "Adri", cohort_id: 1 },
        { name: "Thomas", cohort_id: 2 }
      ]);
    });
};
