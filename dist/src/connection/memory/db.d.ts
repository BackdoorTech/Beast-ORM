import { transaction } from './transaction.js';
export declare class DatabaseMemory {
    static transactions: {
        [key: string]: any[];
    };
    private static executingTransaction;
    static executeTransaction(currentStore: any): void;
    static getOrCreateTransaction(currentStore: any, mode: any, callback: (transaction: transaction) => void): void;
    static objectStoreNames: {
        contains(name: any): boolean;
    };
}
