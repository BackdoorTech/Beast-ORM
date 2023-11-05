import { ITableSchema } from "../../../../BusinessLayer/_interface/interface";
import { Either } from "../../../../Utility/Either";
export declare class ObjectStore {
    schema: ITableSchema;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    db: IDBDatabase;
    txInstance: {
        IDBTransaction?: IDBTransaction;
        IDBTransactionMode?: IDBTransactionMode;
        active?: boolean;
    };
    constructor(tableSchema: ITableSchema);
    enqueueTransaction(transaction: any): Promise<Either<any, false>>;
    processTransactionQueue(): Promise<void>;
    executeTransaction(transaction: any): Promise<unknown>;
    commitTransaction(): boolean;
    createTransaction(): void;
    closeTransaction(): void;
    hasActiveTransaction(): IDBTransaction;
}
