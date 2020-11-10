exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('apply_history').del()
    .then(() => {
      return knex('employers_job_listings').del()
    })
    .then(() => {
      return knex('employers').del()
    })
    .then(function(){
      // Inserts seed entries
      return knex('employers').insert([{
          id: 1,
          status: 'employer',
          first_name: 'Giordano',
          last_name: 'Miriam',
          email: 'giodanom@email.com',
          password: '$2b$10$a7DrmQXxDZBkr4r5dC6kYu.s.LPOeaeCOel.8/o6.LEoto1S1yswq',
          company_name: 'gm',
          br_number: '12345645674567',
          acc_premium: false,
          username: 'gm1234'
        },
        {
          id: 2,
          status: 'employer',
          first_name: 'Anne',
          last_name: 'Daran',
          email: 'anned@emailcom',
          password: '$2b$10$a7DrmQXxDZBkr4r5dC6kYu.s.LPOeaeCOel.8/o6.LEoto1S1yswq',
          company_name: 'ad',
          br_number: '123412341234',
          acc_premium: false,
          username: 'ad1234'
        }
      ]);
    });
};