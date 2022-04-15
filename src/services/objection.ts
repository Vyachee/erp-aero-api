import config from "../config";
import Knex from "knex";
import { Model } from "objection";
import { format, parseISO } from "date-fns";

export const connect = async () => {
    const knex = Knex({
        client: config.db.client,
        connection: {
            host: config.db.host,
            user: config.db.username,
            password: config.db.password,
            database: config.db.database,
            typeCast: function (field: any, next: any) {
                if (field.type === "DATE") {
                    try {
                        return format(parseISO(field.string()), "dd.MM.yyyy");
                    } catch (e) {
                        return null;
                    }
                }
                return next();
            },
        },
    });

    Model.knex(knex);
};