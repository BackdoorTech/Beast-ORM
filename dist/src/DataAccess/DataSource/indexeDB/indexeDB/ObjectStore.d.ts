export declare class ObjectStore {
    db: IDBDatabase;
    enqueueTransaction(transaction: any): Promise<void>;
    processTransactionQueue(): Promise<void>;
    executeTransaction(transaction: any): Promise<void>;
    commitTransaction(): void;
    createTransaction(): void;
    closeTransaction(): void;
    closeConnection(): void;
}
