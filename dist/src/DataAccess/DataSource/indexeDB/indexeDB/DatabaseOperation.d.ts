import { IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { IReturnTriggerObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { DatabaseConnector } from "./DatabaseConnector.js";
import { DatabaseTriggerService } from "./DatabaseTriggerService.js";
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
        [ObjectStoreName: string]: Boolean;
    };
    tigers: DatabaseTriggerService;
    constructor(schema: IDatabaseSchema);
    connect: () => Promise<void>;
    isSchemaHeathy(): boolean;
    migrate(): Promise<void>;
    hasConnectionToDatabase(): IDBDatabase;
    executeOnObjectStore(objectStoreName: string): Promise<ObjectStore>;
    transactionFinish: (TableName: any) => void;
    runTrigger(TableName: any, hasWriteTransaction: boolean): void;
    registerTrigger(tableName: any, data: any, callback: IReturnTriggerObject): void;
    UnRegisterTrigger(tableName: any, subscriptionId: any, callback: IReturnTriggerObject): void;
}
