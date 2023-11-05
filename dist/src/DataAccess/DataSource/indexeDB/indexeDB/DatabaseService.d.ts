import { IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.js";
import { DatabaseConnector } from "./DatabaseConnector.js";
import { ObjectStore } from './ObjectStore.js';
export declare class DatabaseService {
    db: IDBDatabase | null;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    connector: DatabaseConnector;
    schema: IDatabaseSchema;
    objectStore: {
        [storeName: string]: ObjectStore;
    };
    executingTransaction: {
        [key: string]: boolean;
    };
    constructor(schema: IDatabaseSchema);
    connect(): Promise<void>;
    migrate(): Promise<void>;
    hasConnectionToDatabase(): IDBDatabase;
    executeOnObjectStore(objectStoreName: string): Promise<ObjectStore>;
    transactionFinish: (TableName: any) => void;
}
