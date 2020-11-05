exports.up = function(knex) {
    return knex.schema
        .createTable('skilltag', function(table) {
            table.increments().primary()
            table.string('skilltag_name', 255).notNullable()
        })
        .createTable('jobs_skilltag', function(table) {
            table.increments().primary()
            table.integer('jobs_id').unsigned()
            table.foreign('jobs_id').references('jobs.id')
            table.integer('skilltag_id').unsigned()
            table.foreign('skilltag_id').references('skilltag.id')
        })
        .createTable('employee_skilltag', function(table) {
            table.increments().primary()
            table.integer('employees_id').unsigned()
            table.foreign('employees_id').references('employees.id')
            table.integer('skilltag_id').unsigned()
            table.foreign('skilltag_id').references('skilltag.id')
        })
        // .createTable('login_users', (table) => {
        //     table.increments('id').primary();
        //     table.string('employers_username').unsigned();
        //     table.foreign('employers_username').references('employers.username');
        //     table.string('employees_username').unsigned();
        //     table.foreign('employees_username').references('employees.username');
        //     table.string('employees_password').unsigned();
        //     table.foreign('employees_password').references('employees.password');
        //     table.string('employers_password').unsigned();
        //     table.foreign('employers_password').references('employers.password');
        //     table.boolean('employers_status').unsigned();
        //     table.foreign('employers_status').references('employers.status');
        //     table.boolean('employees_status').unsigned();
        //     table.foreign('employees_status').references('employees.status');
        // })
};

exports.down = function(knex) {
    return knex.schema.dropTable('jobs_skilltag').dropTable('employee_skilltag').dropTable('skilltag');
};