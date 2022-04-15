import * as dotenv from "dotenv";

dotenv.config();

export default {
    db: {
        client: 'mysql',
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_ACCESS_KEY,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
    },
};
