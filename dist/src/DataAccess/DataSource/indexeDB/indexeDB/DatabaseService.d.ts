import { DatabaseConnector } from "./DatabaseConnector.js";
import { DatabaseOperations } from "./DatabaseOperations.js";
import { DatabaseTransaction } from "./DatabaseTransaction.js";
import { IDatabaseSchema } from './DatabaseService.type.js';
export declare class DatabaseService {
    db: IDBDatabase | null;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    connector: DatabaseConnector;
    schema: IDatabaseSchema;
    constructor(schema: IDatabaseSchema);
    connect(): Promise<void>;
    migrate(): Promise<void>;
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
