import { Table } from './table.js';
import { DatabaseType } from './../../../Utility/globalInterface.js';
import { DBConnectionManager } from '../../../DataAccess/DBconnectionManager/DBConnectionManager.js';
import { IDatabaseSchema } from '../../_interface/interface.type.js';
import { Model } from '../../../Presentation/Api.js';
export declare class Database {
    databaseName: string;
    version: number;
    type: DatabaseType;
    tables: {
        [key: string]: Table;
    };
    DBConnectionManager: DBConnectionManager;
    constructor(DatabaseSchema: IDatabaseSchema, Models: typeof Model<any>[]);
    getTable(tableName: any): Table;
    private establishConnection;
}
