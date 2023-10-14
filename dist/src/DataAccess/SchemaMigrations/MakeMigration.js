import { Model } from "../../Presentation/Api.js";
import { fields } from '../../Presentation/Model/definitions.js';
const { CharField, indexedDB } = fields;
class Migrations extends Model {
    constructor() {
        super(...arguments);
        this.databaseName = CharField();
        this.migrations = indexedDB.fields.ArrayField({});
    }
}
export class MakeMigrations {
    constructor() {
        this.needToMigrate = false;
    }
    make(Migrations, Function) { }
}
