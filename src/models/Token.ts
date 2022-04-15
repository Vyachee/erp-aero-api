import {Model} from "objection";
import {format} from "date-fns";
import User from "@/models/User";

export default class Token extends Model {
    id!: number;
    user_id!: number;
    access_token!: string;
    refresh_token!: string;
    granted_date!: Date;

    static get tableName() {
        return "tokens";
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'tokens.user_id',
                    to: 'users.id',
                }
            }
        };
    }
}
