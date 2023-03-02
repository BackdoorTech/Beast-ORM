import { DatabaseSchema } from "../../models/register-modal.interface.js";
import { transaction } from './transaction.js';
export declare class IndexedDB {
    static transactions: {
        [key: string]: {
            [key: string]: {
                callback: Function;
                queryId: string;
                mode: string;
                DatabaseName: string;
            }[];
        };
    };
    static transactionsToCommit: {
        [key: string]: {
            [key: string]: {
                callback: Function;
                queryId: string;
                mode: string;
                DatabaseName: string;
            }[];
        };
    };
    static dbInstance: {
        [dbName: string]: IDBDatabase;
    };
    static dbInstanceUsing: {
        [dbName: string]: {
            [store: string]: boolean;
        };
    };
    static txInstance: {
        [dbName: string]: {
            [store: string]: {
                [mode: string]: {
                    IDBTransaction: IDBTransaction;
                    IDBTransactionMode: IDBTransactionMode;
                    active: boolean;
                };
            };
        };
    };
    static txInstanceMode: {
        [dbName: string]: {
            [store: string]: object;
        };
    };
    static storeCache: {
        [dbName: string]: {
            [store: string]: object[];
        };
    };
    static transactionOnCommit: {
        [dbName: string]: {
            [store: string]: {
                [queryId: string]: Object;
            };
        };
    };
    constructor();
    static connect(DatabaseName: string): Promise<IDBDatabase>;
    static migrate(config: DatabaseSchema): Promise<boolean>;
    static run(config: DatabaseSchema): boolean;
    static request({ queryId }: {
        queryId: any;
    }, callback: Function): void;
    private static runMigrations;
    static executingTransaction: {
        [key: string]: {
            [key: string]: boolean;
        };
    };
    static executeTransaction(TableName: any, databaseName: any): void;
    static getOrCreateTransaction({ TableName, queryId, DatabaseName }: {
        TableName: any;
        queryId: any;
        DatabaseName: any;
    }, mode: IDBTransactionMode, callback: (transaction: transaction) => void): void;
    private static createTransaction;
    private static validateBeforeTransaction;
    static transactionOnCommitSubscribe(TableName: string, DatabaseName: string, SubscriptionName: any): {
        run: string;
        subscription: boolean;
        queryId: any;
        value: boolean;
    };
    static transactionOnCommitUnSubscribe(TableName: any, DatabaseName: string, SubscriptionName: any): {
        run: string;
        subscription: boolean;
        queryId: any;
        value: boolean;
    };
}
