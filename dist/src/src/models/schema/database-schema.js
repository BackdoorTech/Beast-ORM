import { TableSchemaClass } from './table-schema.js';
export class DatabaseSchemaClass {
    constructor({ config }) {
        this.name = '';
        this.version = '';
        this.tables = {};
        this.config = config;
        this.name = this.config.databaseName;
        for (let store of config.stores) {
            this.tables[store.name] = new TableSchemaClass({ store });
        }
    }
    getTable(name) {
        return this.tables[name];
    }
}
