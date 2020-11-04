
exports.up = function(knex) {
  return knex.schema
  .createTable('apply_history', function(table){
    table.increments('id').primary();
    table.integer('jobs_id').unsigned();
    table.foreign('jobs_id').references('jobs.id');
    table.integer('employees_id').unsigned();
    table.foreign('employees_id').references('employees.id');
  })

};

exports.down = function(knex) {
    return knex.schema.dropTable('apply_history');
};

