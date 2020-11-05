//create login_users table schema
exports.up = function(knex) {
  return knex.schema
    .createTable('login_users',(table)=>{
      table.select('username').from('employees').union(function(){
        knex.raw('select')
        // this.select('username').from('employers')
      })
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('login_users');
};
