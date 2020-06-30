import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('objectives_weapons', (table) => {
        table.increments();
        table.integer('objective_id')
            .unsigned()
            .notNullable();
        table.integer('weapon_id')
            .unsigned()
            .notNullable();
        table.timestamps(true, true);

        table.foreign('objective_id')
            .references('id')
            .inTable('objectives');
        table.foreign('weapon_id')
            .references('id')
            .inTable('weapons');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('objectives_weapons');
}

