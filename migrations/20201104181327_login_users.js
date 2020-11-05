//create login_users table schema
exports.up = function(knex) {
    return knex.schema
        // .createTable('login_users', (table) => {
        //     table.increments('id').primary();
        //     table.integer('employers_username').unsigned();
        //     table.foreign('employers_username').references('employers.username');
        //     table.integer('employees_username').unsigned();
        //     table.foreign('employees_username').references('employees.username');
        //     table.integer('employees_password').unsigned();
        //     table.foreign('employees_password').references('employees.password');
        //     table.integer('employers_password').unsigned();
        //     table.foreign('employers_password').references('employers.password');
        //     table.integer('employers_status').unsigned();
        //     table.foreign('employers_status').references('employers.status');
        //     table.integer('employees_status').unsigned();
        //     table.foreign('employees_status').references('employees.status');
        // })
}


exports.down = function(knex) {
    // return knex.schema.dropTable('login_users');
}