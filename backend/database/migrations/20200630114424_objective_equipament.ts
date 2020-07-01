import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('objectives_equipaments', (table) => {
        table.increments();
        table.integer('objective_id')
            .unsigned()
            .notNullable();
        table.integer('equipament_id')
            .unsigned()
            .notNullable();
        table.timestamps(true, true);

        table.foreign('objective_id')
            .references('id')
            .inTable('objectives');
        table.foreign('equipament_id')
            .references('id')
            .inTable('equipaments');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('objectives_equipaments');
}

