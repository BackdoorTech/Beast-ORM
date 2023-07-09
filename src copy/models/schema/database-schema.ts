import { Model } from '../model.js';
import { DatabaseSchema as  DatabaseSchemaInterface } from '../register-modal.interface.js';
import { TableSchemaClass } from './table-schema.js';

export class DatabaseSchemaClass {

    name = ''
    version = ''
    tables: {[storeName: string]: TableSchemaClass }  = {}
    config: DatabaseSchemaInterface

    constructor({config}: {config: DatabaseSchemaInterface}) {
        this.config = config
        this.name = this.config.databaseName

        for (let store of config.stores) {
            this.tables[store.name] = new TableSchemaClass({store})
        }
    }

    getTable(name) {
        return this.tables[name]
    }

}