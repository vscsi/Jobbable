exports.seed = function (knex) {
  return knex('employers_job_listings').del()
    .then(() => {
      return knex('jobs_skilltag').del()
    })
    .then(() => {
      return knex('apply_history').del()
    })
    .then(() => {
      return knex('jobs').del()
    })
    .then(() => {
      return knex('jobs').insert([{
          status: true,
          title: '(Junior) Software Engineer',
          company: 'Xccelerate',
          location: 'Hong Kong',
          created_at: 'Sat NOV 07 13:08:14 HKT 2020',
          url: 'localhost:4000',
          job_type: 'Full-time',
          description: 'We are looking for software engineers that can work with python, and process data. SQL knowledge required.',
          how_to_apply: 'email to w@w.com'
        },
        {
          status: true,
          title: '(Senior) Software Engineer',
          company: 'Xccelerate',
          location: 'Hong Kong',
          created_at: 'Sat NOV 07 17:00:09 HKT 2020',
          url: 'localhost:4000',
          job_type: 'Full-time',
          description: 'We are looking for experienced software engineers that can work with python, and process data. SQL knowledge required.',
          how_to_apply: 'email to w@w.com'
        },
        {
          status: true,
          title: 'Front End Developer',
          company: 'Tiger',
          location: '(Remote) Tokyo',
          created_at: 'Sun 8 NOV 19:08 JST 2020 ',
          url: 'localhost:4000',
          job_type: 'Part-time',
          description: 'We are looking for Front End developer who can work remotely, require front end knowledge including: HTML, CSS, JAVASCRIPT, REACT.',
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
    });
};