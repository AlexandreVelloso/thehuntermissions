import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
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
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('missions');
}

