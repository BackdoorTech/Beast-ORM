import { TableSchema } from "../../models/register-modal.interface.js";
import { transaction } from './transaction.js';
export declare class ObjectStore {
    transactions: {
        callback: Function;
        queryId: string;
        mode: string;
    }[];
    parallelTransactions: {
        callback: Function;
        queryId: string;
        mode: string;
        DatabaseName: string;
    }[];
    transactionsToCommit: {
        callback: Function;
        queryId: string;
        mode: string;
    }[];
    dbInstance: IDBDatabase;
    txInstance: {
        IDBTransaction: IDBTransaction;
        IDBTransactionMode: IDBTransactionMode;
        active: boolean;
    };
    executingTransaction: boolean;
    txInstanceMode: object;
    storeCache: {
        [store: string]: object[];
    };
    transactionOnCommit: {
        [queryId: string]: Object;
    };
    name: string;
    transactionFinish: (TableName: any) => void;
    config: TableSchema;
    constructor({ store }: {
        store: TableSchema;
    });
    transactionTrigger(): Promise<void>;
    executeTransaction(): void;
    parallelExecuteTransaction(): void;
    getOrCreateTransaction({ queryId, Database }: {
        queryId: any;
        Database: any;
    }, mode: IDBTransactionMode, callback: (transaction: transaction) => void): void;
    private createTransaction;
    private validateBeforeTransaction;
    transactionOnCommitSubscribe(TableName: string, DatabaseName: string, SubscriptionName: any): {
        run: string;
        subscription: boolean;
        queryId: any;
        value: boolean;
    };
    transactionOnCommitUnSubscribe(TableName: any, DatabaseName: string, SubscriptionName: any): {
        run: string;
        subscription: boolean;
        queryId: any;
        value: boolean;
    };
}
