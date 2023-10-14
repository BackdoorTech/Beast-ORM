import { Table } from './table.js';
import { DatabaseType } from './../../../Utility/globalInterface.js';
import { dataAccess } from '../../../DataAccess/dataAccess.js';
export class Database {
    constructor(DatabaseSchema) {
        this.type = DatabaseType.IndexedDB;
        this.tables = [];
        this.databaseName = DatabaseSchema.databaseName;
        this.version = DatabaseSchema.version;
        for (const tableSchema of DatabaseSchema.table) {
            const table = new Table(tableSchema);
            this.tables.push(table);
        }
        this.establishConnection(DatabaseSchema);
    }
    establishConnection(DatabaseSchema) {
        this.DBConnectionManager = dataAccess.createDBconnectionManager(DatabaseSchema);
    }
}
