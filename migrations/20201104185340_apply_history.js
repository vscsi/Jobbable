
exports.up = function(knex) {
  return knex.schema
  .createTable('apply_history', function(table){
    table.increments('id').primary();
    table.select('jobs.id', 'employees.id')
    .from('jobs')
    .innerJoin('employees', 'jobs.id', 'employee.id')
  })

};

exports.down = function(knex) {
    return knex.schema.dropTable('apply_history');
};

