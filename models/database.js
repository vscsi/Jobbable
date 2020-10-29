//bring all enviornment variables available in this file
require('dotenv').config();

//the client pool allows you to have a reusable pool of clients to check out/ return /use
//clients are applications that interact with the database
const {Pool} =require('pg');

//NODE_ENV specifies the enviornment  in which an application is running
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction?process.env.DATABASE_URL:connectionString
});

module.exports = {pool};