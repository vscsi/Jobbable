// Update with your config settings.
// const path = require('path')
require('dotenv').config({ path: __dirname + './models/.env' })

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgres',
      database : 'jobbable'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
  }

};
