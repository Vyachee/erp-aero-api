import {Model} from "objection";
import File from "@/models/File";

export default class User extends Model {
    id!: number;
    credential!: string;
    password!: string;
    files!: File[];

    static get tableName() {
        return "users";
    }

    static get relationMappings() {
        return {
            files: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'files.user_id',
                }
            }
        };
    }
}
