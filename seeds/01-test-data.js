
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        {id:1,  status:'employee', first_name:'test', last_name:'test', email:'test@test.com', password:'123456', username:'test'},
      ]);
    });
};
