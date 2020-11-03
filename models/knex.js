//database connection file creation
const environment = process.env.NODE_ENV  || 'development';
const config = require('./knexfile');
const environmentConfig = config[enviornment];
const knex = require('knex');
const connection = knex(environmentConfig);

module.exports = connection;