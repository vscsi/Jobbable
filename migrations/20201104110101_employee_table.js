//create table 'Jobs'
exports.up = knex => {
  return knex.schema
  .createTable('Jobs', function(table){
    table.increments().primary();
    table.boolean('status(exclusive/non-exclusive)').notNullable();
    table.string('title', 255);
    table.string('company', 255);
    table.string('location',255);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.string('url');
    table.string('job_type');
    table.string('description');
  })
};

exports.down = knex => {
  return knex.schema.dropTable('Jobs');
};