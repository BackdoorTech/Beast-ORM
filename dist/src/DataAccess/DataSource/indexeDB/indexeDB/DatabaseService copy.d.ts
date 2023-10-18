import { DatabaseConnector } from "./DatabaseConnector";
import { DatabaseOperations } from "./DatabaseOperations";
import { DatabaseTransaction } from "./DatabaseTransaction";
export declare class DatabaseService {
    db: IDBDatabase | null;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    connector: DatabaseConnector;
    constructor(dbName: any, version: any);
    connect(): Promise<void>;
    hasConnectionToDatabase(): IDBDatabase;
    enqueueTransaction(transaction: any): Promise<void>;
    processTransactionQueue(): Promise<void>;
    executeTransaction(transaction: any): Promise<unknown>;
    commitTransaction(): void;
    createTransaction(): void;
    closeTransaction(): void;
    closeConnection(): void;
    operations(): DatabaseOperations;
    transaction(): DatabaseTransaction;
}
