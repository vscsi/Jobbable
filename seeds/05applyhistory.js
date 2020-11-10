exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('apply_history').del()
    .then(function () {
      // Inserts seed entries
      return knex('apply_history').insert([{
          jobs_id: 1,
          employees_id: 1
        },
        {
          jobs_id: 2,
          employees_id: 1
        },
        {
          jobs_id: 4,
          employees_id: 1
        },
        {
          jobs_id: 2,
          employees_id: 2
        },
        {
          jobs_id: 3,
          employees_id: 2
        },
        {
          jobs_id: 4,
          employees_id: 2
        },
      ]);
    });
};