import { TableSchema } from "./resource/type";
export declare class ObjectStore {
    schema: TableSchema;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    db: IDBDatabase;
    txInstance: {
        IDBTransaction?: IDBTransaction;
        IDBTransactionMode?: IDBTransactionMode;
        active?: boolean;
    };
    constructor(tableSchema: TableSchema);
    enqueueTransaction(transaction: any): Promise<void>;
    processTransactionQueue(): Promise<void>;
    executeTransaction(transaction: any): Promise<unknown>;
    commitTransaction(): boolean;
    createTransaction(): void;
    closeTransaction(): void;
    hasActiveTransaction(): IDBTransaction;
}
