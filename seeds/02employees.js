exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('apply_history').del()
    .then(() => {
      return knex('employers_job_listings').del()
    })
    .then(() => {
      return knex('employees').del()
    })
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([{
          id: 1,
          status: 'employee',
          first_name: 'Monika',
          last_name: 'Monday',
          email: 'monmon@email.com',
          password: '$2b$10$a7DrmQXxDZBkr4r5dC6kYu.s.LPOeaeCOel.8/o6.LEoto1S1yswq',
          username: 'mm4321'
        },
        {
          id: 2,
          status: 'employee',
          first_name: 'Vlad',
          last_name: 'Gael',
          email: 'vladg@email.com',
          password: '$2b$10$a7DrmQXxDZBkr4r5dC6kYu.s.LPOeaeCOel.8/o6.LEoto1S1yswq',
          username: 'vg4321'
        },
      ]);
    })
};