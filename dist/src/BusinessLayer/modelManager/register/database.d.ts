import { Table } from './table.js';
import { DatabaseType } from './../../../Utility/globalInterface.js';
import { IConfig } from './database.type.js';
import { DBConnectionManager } from '../../../DataAccess/DBconnectionManager/DBConnectionManager.js';
export declare class Database {
    databaseName: string;
    version: number;
    type: DatabaseType;
    tables: Table[];
    DBConnectionManager: DBConnectionManager;
    constructor(DatabaseSchema: IConfig);
    private establishConnection;
}
