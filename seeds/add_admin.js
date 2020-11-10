
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {id:1,  status:'admin', first_name:'admin1', last_name:'admin1', email:'/', password:'admin1', username:'admin1'},
        {id:2,  status:'admin', first_name:'admin2', last_name:'admin2', email:'/', password:'admin2', username:'admin2'},
        {id:3,  status:'admin', first_name:'admin3', last_name:'admin3', email:'/', password:'admin3', username:'admin3'},
      ]);
    });
};
