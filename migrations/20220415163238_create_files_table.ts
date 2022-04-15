import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('files', table => {
        table.increments();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.string('title');
        table.string('extension');
        table.string('mime');
        table.bigInteger('size');
        table.datetime('upload_date');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('files');
}

