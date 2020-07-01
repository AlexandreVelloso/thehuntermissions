import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username').notNullable();
        table.string('email', 254).notNullable().unique();
        table.string('password', 60).notNullable();
        table.string('refresh_token', 256).notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('users');
}

