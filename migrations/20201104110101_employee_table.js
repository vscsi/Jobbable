//make payment column nullalbe
exports.up = knex => {
  return knex.schema
    .alterTable('employers', (table) => {
      table.text('acc-premium').nullable().alter();
    });
};

exports.down = knex => {
  return knex.schema
    .alterTable('employers', table => {
      table.string('acc-premium').notNullable().alter();
    });
};