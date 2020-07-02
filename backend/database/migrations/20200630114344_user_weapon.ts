import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('user_weapons', (table) => {
        table.increments();
        table.integer('weapon_id')
            .unsigned()
            .notNullable();
        table.integer('user_id')
            .unsigned()
            .notNullable();
        table.boolean('have_weapon')
            .defaultTo(false);
        table.timestamps(true, true);

        table.foreign('weapon_id')
            .references('id')
            .inTable('weapons');
        table.foreign('user_id')
            .references('id')
            .inTable('users');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('user_weapons');
}

