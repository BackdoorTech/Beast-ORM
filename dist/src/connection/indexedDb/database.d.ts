import { DatabaseSchema } from '../../models/register-modal.interface';
import { ObjectStore } from './objectStore.js';
export declare class Database {
    name: string;
    version: string;
    objectStore: {
        [storeName: string]: ObjectStore;
    };
    dbInstance: IDBDatabase;
    executingTransaction: {
        [key: string]: boolean;
    };
    storeUsingDbInstance: {
        [key: string]: boolean;
    };
    config: DatabaseSchema;
    constructor({ config }: {
        config: DatabaseSchema;
    });
    getDatabaseConnection(): Promise<IDBDatabase>;
    getOrCreateTransaction({ TableName, queryId }: {
        TableName: any;
        queryId: any;
    }, mode: IDBTransactionMode, callback: any): Promise<void>;
    getObjectStore(TableName: any): ObjectStore;
    transactionFinish: (TableName: any) => void;
    migrate(): Promise<boolean>;
}
