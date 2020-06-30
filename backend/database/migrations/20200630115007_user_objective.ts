import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('user_objectives', (table) => {
        table.increments();
        table.integer('objective_id')
            .unsigned()
            .notNullable();
        table.integer('user_id')
            .unsigned()
            .notNullable();
        table.boolean('completed')
            .defaultTo(false);
        table.timestamps(true, true);

        table.foreign('objective_id')
            .references('id')
            .inTable('objectives');
        table.foreign('user_id')
            .references('id')
            .inTable('users');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('user_objectives');
}

