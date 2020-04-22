
exports.up = function up(knex) {
    return knex.schema.createTable('objectives', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('mission_id')
            .unsigned()
            .notNullable();
        table.timestamps(true, true);

        table.foreign('mission_id')
            .references('id')
            .inTable('animals');
    });
};

exports.down = function down(knex) {
    return knex.schema.dropTable('objectives');
};
