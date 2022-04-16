import {Model} from "objection";
import {format} from "date-fns";
import User from "@/models/User";

export default class File extends Model {
    id!: number;
    user_id!: string;
    title!: string;
    extension!: string;
    mime!: string;
    size!: bigint;
    upload_date!: Date;

    static get tableName() {
        return "files";
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'files.user_id',
                    to: 'users.id',
                }
            }
        };
    }
}
