import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('weapons', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.integer('price');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('weapons');
}

