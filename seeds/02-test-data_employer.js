exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employers').del()
    .then(function () {
      // Inserts seed entries
      return knex('employers').insert([
        {id: 1,  status:'employer', first_name:'test_employer', last_name:'test_employer', email:'employer@test.com', password:'123456', username:'test_employer', company_name:'123', br_number:'123', acc_premium:'false'},
      ]);
    });
};