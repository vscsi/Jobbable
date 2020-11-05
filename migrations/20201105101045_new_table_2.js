
exports.up = function(knex) {
  return knex.schema
  .createTable('skilltag', function(table){
      table.increment().primary()
      table.string('skilltag_name', 255).notNullable()
  }
  )
  .createTable('jobs_skilltag', function(table){
      table.increment().primary()
      table.integer('jobs_id').unsigned()
      table.foreign('jobs_id').reference('jobs.id')
      table.integer('skilltag_id').unsigned()
      table.foreign('skilltag_id').reference('skilltag.id')
  })
  .createTable('employee_skilltag', function(table){
    table.increment().primary()
    table.integer('employees_id').unsigned()
    table.foreign('employees_id').reference('employees.id')
    table.integer('skilltag_id').unsigned()
    table.foreign('skilltag_id').reference('skilltag.id')
})
};

exports.down = function(knex) {
  
};
