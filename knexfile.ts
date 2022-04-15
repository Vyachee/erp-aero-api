require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            port: process.env.DATABASE_PORT,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME || 'adventures',
            user: process.env.DATABASE_USER || 'root',
            password: process.env.DATABASE_ACCESS_KEY,
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
}
