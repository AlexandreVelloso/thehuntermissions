
exports.up = function up(knex) {
    return knex.schema.createTable('missions', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('reward').notNullable();
        table.string('hint', 800);
        table.integer('animal_id')
            .unsigned();
        table.timestamps(true, true);

        table.foreign('animal_id')
            .references('id')
            .inTable('animals');
    });
};

exports.down = function down(knex) {
    return knex.schema.dropTable('missions');
};
