import { ITableSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { Either } from "../../../../Utility/Either/index.js";
import { ObjectStoreRequestResult } from "./ObjectStore.type.js";
export declare class ObjectStore {
    schema: ITableSchema;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    db: IDBDatabase;
    operation: any;
    connect: () => void;
    transactionFinish: (tableName: string, hasWriteTransaction: boolean) => void;
    txInstance: {
        IDBTransaction?: IDBTransaction;
        IDBTransactionMode?: IDBTransactionMode;
        active?: boolean;
    };
    hasWriteTransaction: boolean;
    constructor(tableSchema: ITableSchema);
    enqueueTransaction(transaction: any): Promise<Either<ObjectStoreRequestResult, false>>;
    processTransactionQueue(): Promise<void>;
    executeTransaction(transaction: any): Promise<unknown>;
    commitTransaction(): boolean;
    clearVariables(): void;
    writeTransactionFlag(): void;
    createTransaction(): void;
    closeTransaction(): void;
    hasActiveTransaction(): IDBTransaction;
}
