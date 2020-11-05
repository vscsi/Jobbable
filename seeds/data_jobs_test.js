exports.seed = function(knex) {
  return knex('jobs').del()
    .then(function () {
      return knex('jobs').insert([
        {id: 1,  github_id: 1, 'status': 'F', title: 'test', company: 'test1', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdWFOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3bab0e75efc5ef66fb7e38bd0d4164e1f1462a55/schellman-logomark-fullcolor%20(1).png', how_to_apply: 'test'},
        {id: 2,  github_id: 2, 'status': 'T', title: 'test', company: 'test2', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 3,  github_id: 3, 'status': 'T', title: 'test', company: 'test3', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 4,  github_id: 4, 'status': 'F', title: 'test', company: 'test4', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 5,  github_id: 5, 'status': 'F', title: 'test', company: 'test5', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 6,  github_id: 6, 'status': 'F', title: 'test', company: 'test6', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 7,  github_id: 7, 'status': 'F', title: 'test', company: 'test7', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 8,  github_id: 8, 'status': 'F', title: 'test', company: 'test8', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 9,  github_id: 9, 'status': 'F', title: 'test', company: 'test9', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
        {id: 10,  github_id: 10, 'status': 'F', title: 'test', company: 'test10', location: 'test', created_at: 'test', url:'test', job_type: 'test', description:'test', company_logo: 'test', how_to_apply: 'test'},
      ]);
    });
};