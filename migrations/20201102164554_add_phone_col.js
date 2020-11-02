
exports.up = function(knex) {
  return knex.schema.table('employees',function(table){
    table.integer('phone');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('employees',function(table){
    table.dropColumn('phone');
  })
};
