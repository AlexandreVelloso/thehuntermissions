import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('equipaments', (table)=>{
        table.increments();
        table.string('name');
        table.integer('price');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('equipaments');
}

