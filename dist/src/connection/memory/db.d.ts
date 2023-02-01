import { transaction } from './transaction.js';
export declare class DatabaseMemory {
    private static data;
    static transactions: any[];
    private static executingTransaction;
    static transaction(currentStore: any, dbMode: any): transaction;
    executeTransaction(): void;
    static createTransaction(currentStore: any, mode: any, callback: (transaction: any) => void): void;
    static objectStoreNames: {
        contains(name: any): boolean;
    };
}
