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
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('url');
    table.string('job_type').notNullable();
    table.string('description').notNullable();
  })
};

exports.down = knex => {
  return knex.schema.dropTable('jobs');
};