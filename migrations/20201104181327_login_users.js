//create login_users table schema
exports.up = function(knex) {
  return knex.schema
    .createTable('login_users',(table)=>{
      
    })
};

exports.down = function(knex) {
  
};
