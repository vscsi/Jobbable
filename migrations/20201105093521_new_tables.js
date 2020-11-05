//create job bookmark, employers_jobs listing ,  talent bookmarks

exports.up = function(knex) {
  return knex.schema
  .createTable('jobs_bookmarks', function(table){
    table.increments('id').primary();
    table.integer('jobs_id').unsigned();
    table.foreign('jobs_id').references('jobs.id');
    table.integer('employee_id').unsigned();
    table.foreign('employee_id').references('employees.id')
  })
  .createTable('employers_job_listings', function(table){
    table.increments('id').primary();
    table.integer('employers_id').unsigned();
    table.foreign('employers_id').references('employers.id');
    table.integer('jobs_id').unsigned();
    table.foreign('jobs_id').references('jobs.id');
  })
  .createTable('talent_bookmarks', function(table){
    table.increments('id').primary();
    table.integer('employers_id').unsigned();
    table.foreign('employers_id').references('employers.id');
    table.integer('employees_id').unsigned();
    table.foreign('employees_id').references('employees.id');
  })

};

exports.down = function(knex) {
    return knex.schema.dropTable('jobs_bookmarks').dropTable('employers_job_listings').dropTable('talent_bookmarks');
};

