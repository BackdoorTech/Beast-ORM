import { Table } from './table.js';
import { DatabaseType } from './../../../Utility/globalInterface.js';
import { DBConnectionManager } from '../../../DataAccess/DBconnectionManager/DBConnectionManager.js';
import { IDatabaseSchema } from '../../_interface/interface.js';
export declare class Database {
    databaseName: string;
    version: number;
    type: DatabaseType;
    tables: Table[];
    DBConnectionManager: DBConnectionManager;
    constructor(DatabaseSchema: IDatabaseSchema);
    private establishConnection;
}
