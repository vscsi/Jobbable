
exports.up = function(knex) {
  return knex.schema.createTable('employers',(table)=>{
    table.increments('id').primary();
    table.string('status').notNullable();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.text('company_name').notNullable();
    table.text('br_number').notNullable();
    table.boolean('acc_premium').notNullable().defaultTo(false);
    table.text('username').notNullable();
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('employers');
};
