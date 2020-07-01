import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('animals', (table) => {
        table.increments();
        table.string('name', 50).notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('animals');
}
