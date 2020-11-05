//create table 'Jobs'
exports.up = knex => {
  return knex.schema
  .createTable('jobs', function(table){
    table.increments('id').primary();
    table.string('github_id')
    table.boolean('status(exclusive/non-exclusive)').defaultTo('false').notNullable();
    table.string('title', 255).notNullable();
    table.string('company', 255).notNullable();
    table.string('location',255).notNullable();
    table.string('created_at');
    table.string('url');
    table.string('job_type').notNullable();
    table.string('description', 15000).notNullable();
    table.string('company_logo');
    table.string('how_to_apply', 1000)
  })
};

exports.down = knex => {
  return knex.schema.dropTable('jobs');
};