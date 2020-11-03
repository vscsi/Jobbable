//bring all enviornment variables available in this file
require('dotenv').config({path: __dirname + '/.env'})

//the client pool allows you to have a reusable pool of clients to check out/ return /use
//clients are applications that interact with the database
const { Pool } = require('pg');

//NODE_ENV specifies the enviornment  in which an application is running
const isProduction = process.env.NODE_ENV === "development";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

let config = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}
// connectionString: isProduction?process.env.DATABASE_URL:connectionString
const pool = new Pool(config);

//check connection error
pool.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = { pool };
//git commit -m 'update gitignore added database config, need to set up .env file'