exports.up = (knex, Promise) => {
  return knex.schema.createTable('employees', (table) => {
    table.increments('id').primary();
    table.string('username').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('employees');
};