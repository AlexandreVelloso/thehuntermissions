
exports.up = function up(knex) {
    return knex.schema.createTable('animals', (table) => {
        table.increments();
        table.string('name', 50).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function down(knex) {
    return knex.schema.dropTable('animals');
};
