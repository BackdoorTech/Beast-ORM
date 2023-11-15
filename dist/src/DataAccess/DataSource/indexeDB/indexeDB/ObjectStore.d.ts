import { ITableSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { Either } from "../../../../Utility/Either/index.js";
import { ObjectStoreRequestResult } from "./ObjectStore.type.js";
export declare class ObjectStore {
    schema: ITableSchema;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    db: IDBDatabase;
    connect: () => void;
    transactionFinish: (a: any) => void;
    txInstance: {
        IDBTransaction?: IDBTransaction;
        IDBTransactionMode?: IDBTransactionMode;
        active?: boolean;
    };
    constructor(tableSchema: ITableSchema);
    enqueueTransaction(transaction: any): Promise<Either<ObjectStoreRequestResult, false>>;
    processTransactionQueue(): Promise<void>;
    executeTransaction(transaction: any): Promise<unknown>;
    commitTransaction(): boolean;
    createTransaction(): void;
    closeTransaction(): void;
    hasActiveTransaction(): IDBTransaction;
}
