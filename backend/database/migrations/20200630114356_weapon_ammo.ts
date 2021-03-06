import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('weapons_ammos', (table) => {
        table.increments();
        table.integer('weapon_id')
            .unsigned()
            .notNullable();
        table.integer('ammo_id')
            .unsigned()
            .notNullable();
        table.timestamps(true, true);

        table.foreign('weapon_id')
            .references('id')
            .inTable('weapons');
        table.foreign('ammo_id')
            .references('id')
            .inTable('ammos');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('weapons_ammos');
}

