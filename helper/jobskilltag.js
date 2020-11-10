const pg = require('pg');
const {
    pool
} = require('../models/database');
const knex = require('../models/knex');


(async function skilltagname() {

        // console.log(`running jobskilltag function`)

        // let jobs = await knex('jobs').select('id')

        // // console.log(jobs[0].id)


        // let names = await knex.from('skilltag').select('skilltag_name');

        // let search = [];

        // for (let i = 0; i < names.length; i++) {
        //     search.push(names[i].skilltag_name)
        // }

        // let query, insert;
        // let temp = [];
        // let obj = {st: '', jd: ''};
        // let arr = [];


        // for (let i = 0; i < jobs.length; i++) {
        //     for (let j = 0; j < names.length; j++) {
        //         query = await knex('jobs').select('id').where('title', 'ilike', `%${names[j].skilltag_name}%`).andWhere({id: `${jobs[i].id}`})
        //         if(query.length>0){
        //             obj.st = names[j+1].skilltag_name
        //             obj.jd = jobs[i+1].id
        //         }
        //         console.log(obj)

        //     }
        // }



        })()

    /*

    var subquery = knex('users')
      .whereNot('votes', '>', 100)
      .andWhere('status', 'active')
      .orWhere('name', 'John')
      .select('id');




    */