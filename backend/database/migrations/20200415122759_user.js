
exports.up = function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username').notNullable();
        table.string('email', 254).notNullable().unique();
        table.string('password', 60).notNullable();
        table.string('refresh_token', 256).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function down(knex) {
    return knex.schema.dropTable('users');
};
