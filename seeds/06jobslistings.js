
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employers_job_listings').del()
    .then(function () {
      // Inserts seed entries
      return knex('employers_job_listings').insert([
        {employers_id: 1, jobs_id: 1, },
        {employers_id: 1, jobs_id: 2},
        {employers_id: 2, jobs_id: 3},
        {employers_id: 2, jobs_id: 4},
      ]);
    });
};
