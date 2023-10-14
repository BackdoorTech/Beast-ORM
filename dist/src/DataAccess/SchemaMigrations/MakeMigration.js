import { Model } from "../../Presentation/Api.js";
import { CharField, indexedDB } from '../../Presentation/Model/definitions.js';
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
