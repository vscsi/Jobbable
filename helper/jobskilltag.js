const pg = require('pg');
const {
    pool
} = require('../models/database');
const knex = require('../models/knex');


(async function skilltagname() {
    let search, query, check = [];
    let names = await knex.from('skilltag').select('id', 'skilltag_name');
    for (let i = 0; i < names.length; i++) {
        search = names[i].skilltag_name;
        query = await knex.from('jobs').select('id', 'title').where('description', 'ilike', `%${search}%`);
        check.push(query)
    }

    //loop over check first index number for the skills id
    //so if check[0][i].id this will be all the jobs for the HTML skills
    //then use knex, and insert into table, using a nested for loop
    //something like, knex('jobs_skilltag').insert({jobs_id: "${j}", skilltag_id: "${i}"})

    for (let i = 0; i < check.length; i++) {
        for (let j = 0; j < check[i].length; j++) {
            console.log(`this is skilltag > ${i+1} and this is job > ${j+1}`)
            await knex.insert({jobs_id: `${j+1}`, skilltag_id: `${i+1}`}).into('jobs_skilltag');
        }
    }
})();