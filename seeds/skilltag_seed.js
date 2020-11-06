
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('skilltag').del()
    .then(function () {
      // Inserts seed entries
      return knex('skilltag').insert([
        {id: 1, skilltag_name: 'HTML'},
        {id: 2, skilltag_name: 'CSS'},
        {id: 3, skilltag_name: 'Javascript'},
        {id: 4, skilltag_name: 'Python'},
        {id: 5, skilltag_name: 'Front end'},
        {id: 6, skilltag_name: 'Back End'},
        {id: 7, skilltag_name: 'NodeJS'},
        {id: 8, skilltag_name: 'React'},
        {id: 9, skilltag_name: 'Data'},
        {id: 10, skilltag_name: 'Engineer'},
        {id: 11, skilltag_name: 'Web Dev'},
        {id: 12, skilltag_name: 'AWS'},
        {id: 13, skilltag_name: 'Ruby'},
        {id: 14, skilltag_name: 'Mobile'},
        {id: 15, skilltag_name: 'Senior'},
        {id: 16, skilltag_name: 'Junior'},
        {id: 17, skilltag_name: 'Java'},
        {id: 18, skilltag_name: 'Full stack'},
        {id: 19, skilltag_name: 'Django'},
        {id: 20, skilltag_name: 'Fintech'},
        {id: 21, skilltag_name: 'SQL'},
        {id: 22, skilltag_name: 'Typescript'},
        {id: 23, skilltag_name: 'MongoDB'},
        {id: 24, skilltag_name: 'MySQL'},
        {id: 25, skilltag_name: 'C#'},
        {id: 26, skilltag_name: 'Dev Ops'},
        {id: 27, skilltag_name: 'Machine Learning'},
        {id: 28, skilltag_name: 'AI'},
        {id: 29, skilltag_name: 'VueJS'},
        {id: 30, skilltag_name: 'C++'},
        {id: 31, skilltag_name: 'Frontend'},
        {id: 32, skilltag_name: '.NET'},
        {id: 33, skilltag_name: 'PHP'},
        
      ]);
    });
};
