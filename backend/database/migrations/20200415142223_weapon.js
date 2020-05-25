
exports.up = function up(knex) {
    return knex.schema.createTable('weapons', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('price');
        table.timestamps(true, true);
    });
};

exports.down = function down(knex) {
    return knex.schema.dropTable('weapons');
};
