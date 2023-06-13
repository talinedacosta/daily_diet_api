import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable().index();
        table.text('title').notNullable();
        table.text('description');
        table.text('isDiet').notNullable();
        table.timestamp('eaten_at').notNullable();
        table.timestamp('updated_at').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meals');
}

