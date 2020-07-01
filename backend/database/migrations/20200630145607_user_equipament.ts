import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('user_equipaments', (table)=>{
        table.increments();
        table.integer('equipament_id')
            .unsigned()
            .notNullable();
        table.integer('user_id')
            .unsigned()
            .notNullable();
        table.boolean('have_equipament')
            .defaultTo(false);
        table.timestamps(true, true);

        table.foreign('equipament_id')
            .references('id')
            .inTable('equipaments');
        table.foreign('user_id')
            .references('id')
            .inTable('users');
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('user_equipaments');
}

