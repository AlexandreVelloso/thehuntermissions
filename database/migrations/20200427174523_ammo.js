
exports.up = function up(knex) {
    return knex.schema.createTable('ammos', (table) => {
        table.increments();
        table.string('name');
        table.timestamps(true, true);
    });
};

exports.down = function down(knex) {
    return knex.schema.dropTable('ammos');
};
