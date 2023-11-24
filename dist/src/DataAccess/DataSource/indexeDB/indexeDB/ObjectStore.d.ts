import { ITableSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { DatabaseTransaction } from "./DatabaseTransaction.js";
export declare class ObjectStore {
    schema: ITableSchema;
    private isTransactionInProgress;
    private db;
    private transactions;
    transactionFinish: (tableName: string, hasWriteTransaction: boolean) => void;
    private currentTransaction;
    constructor(tableSchema: ITableSchema);
    setDbInstance(db: IDBDatabase): void;
    createDedicatedTransaction(): DatabaseTransaction;
    addTransaction(transaction: DatabaseTransaction): void;
    count: number;
    findOrCreateNotDedicatedTransaction(): DatabaseTransaction;
    processTransactionQueue(): Promise<void>;
    endProcessTransactionQueue(lastTransaction: DatabaseTransaction): void;
    hasActiveTransaction(): boolean;
}
