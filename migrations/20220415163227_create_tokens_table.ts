import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tokens', table => {
        table.increments();
        table.string('user_id');
        table.foreign('user_id').references('users.id');
        table.string('access_token');
        table.string('refresh_token');
        table.datetime('granted_date');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tokens');
}

