exports.seed = function (knex) {
  // Deletes ALL existing entries
  // return knex('').del()
  //   .then(function () {
  // Inserts seed entries
  return knex('jobs').insert([{
      status: true,
      title: 'Rich bitch',
      company: 'xccelerate',
      location: 'Hong Kong',
      created_at: 'SAT 7 NOV 13:08 HKT ',
      url: 'localhost:4000',
      job_type: 'Full-time',
      description: 'Be a rich biatch',
      how_to_apply: 'email to w@w.com'
    },
    {
      status: true,
      title: 'Rich bastard',
      company: 'xccelerate',
      location: 'remote',
      created_at: 'SAT 6 NOV 13:08 HKT ',
      url: 'localhost:4000',
      job_type: 'part-time',
      description: 'Be a rich bastard',
      how_to_apply: 'email to w@w.com'
    },
    {
      status: true,
      title: 'Software engineer',
      company: 'xccelerate',
      location: 'Hong Kong',
      created_at: 'SAT 3 NOV 13:08 HKT ',
      url: 'localhost:4000',
      job_type: 'Full-time',
      description: 'Engineer some software',
      how_to_apply: 'email to w@w.com'
    },
    {
      status: true,
      title: 'Full-stack software engineer',
      company: 'xccelerate',
      location: 'Tokyo',
      created_at: 'SAT 2 NOV 13:08 HKT ',
      url: 'localhost:4000',
      job_type: 'Full-time',
      description: 'Work in tokyo remotely',
      how_to_apply: 'email to w@w.com'
    }
  ]);
  // });
};