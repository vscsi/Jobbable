
exports.up = function(knex) {
  return knex.schema.createTable('employees',(table)=>{
    table.increments('id').primary();
    table.string('status').notNullable();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.text('username').notNullable();
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('employees');
};
