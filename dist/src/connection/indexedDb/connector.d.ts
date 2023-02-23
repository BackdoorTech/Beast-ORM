import { DatabaseSchema } from '../../models/register-modal.interface.js';
import { transaction } from './transaction.js';
export declare class IndexedDB {
    static transactions: {
        [key: string]: {
            [key: string]: {
                callback: Function;
                queryId: string;
                mode: string;
                config: DatabaseSchema;
            }[];
        };
    };
    static dbInstance: {
        [dbNmae: string]: IDBDatabase;
    };
    static dbInstanceUsing: {
        [dbNmae: string]: {
            [store: string]: boolean;
        };
    };
    static txInstance: {
        [dbNmae: string]: {
            [store: string]: IDBTransaction;
        };
    };
    static txInstanceMode: {
        [dbNmae: string]: {
            [store: string]: object;
        };
    };
    constructor();
    static connect(config: DatabaseSchema): Promise<IDBDatabase>;
    static migrate(config: DatabaseSchema): Promise<boolean>;
    static run(config: any): boolean;
    static request({ queryId }: {
        queryId: any;
    }, callback: Function): void;
    private static runMigrations;
    static executingTransaction: {
        [key: string]: {
            [key: string]: boolean;
        };
    };
    static executeTransaction(currentStore: any, databaseName: any): void;
    static getOrCreateTransaction({ currentStore, queryId, config }: {
        currentStore: any;
        queryId: any;
        config: any;
    }, mode: any, callback: (transaction: transaction) => void): void;
    private static createTransaction;
}
