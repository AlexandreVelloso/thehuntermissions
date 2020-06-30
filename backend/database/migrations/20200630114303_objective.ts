import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('objectives', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('mission_id')
            .unsigned()
            .notNullable();
        table.timestamps(true, true);

        table.foreign('mission_id')
            .references('id')
            .inTable('missions');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('objectives');
}

