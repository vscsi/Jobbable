exports.seed = function(knex) {
  return knex('jobs').del()
    .then(function () {
      return knex('jobs').insert([
        {id: 1,  github_id: 1, 'status(exclusive/non-exclusive)': 'F', title: 'test', company: 'test', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 2,  github_id: 1, 'status(exclusive/non-exclusive)': 'F', title: 'test', company: 'test', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'}
      ]);
    });
};