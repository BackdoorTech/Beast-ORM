import { Table } from './table.js';
import { DatabaseType } from './../../../Utility/globalInterface.js';
import { dataAccess } from '../../../DataAccess/dataAccess.js';
export class Database {
    constructor(DatabaseSchema, Models) {
        this.type = DatabaseType.IndexedDB;
        this.tables = {};
        this.databaseName = DatabaseSchema.databaseName;
        this.version = DatabaseSchema.version;
        const tables = DatabaseSchema.table.concat(DatabaseSchema.middleTables);
        for (const tableSchema of tables) {
            const model = Models.find((e) => e.getTableSchema().name == tableSchema.name);
            const table = new Table(tableSchema, model);
            this.tables[tableSchema.name] = table;
        }
        this.establishConnection(DatabaseSchema);
    }
    getTable(tableName) {
        return this.tables[tableName];
    }
    establishConnection(DatabaseSchema) {
        this.DBConnectionManager = dataAccess.createDBconnectionManager(DatabaseSchema);
    }
}
