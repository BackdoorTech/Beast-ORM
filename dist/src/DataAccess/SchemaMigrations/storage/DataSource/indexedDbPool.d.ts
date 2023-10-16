declare class indexedDBFIFO {
    dbName: any;
    db: any;
    transactionQueue: any[];
    isTransactionInProgress: boolean;
    txInstance: any;
    constructor(dbName: string);
    openDatabase(): Promise<unknown>;
    pending: number;
    processTransactionQueue(): Promise<void>;
    executeTransaction(transaction: any): Promise<unknown>;
    enqueueTransaction({ storeName, mode, operation, data, callback }: {
        storeName: any;
        mode: any;
        operation: any;
        data: any;
        callback: any;
    }): Promise<void>;
    insert(storeName: any, data: any, callback: any): Promise<void>;
    get(storeName: any, key: any, callback: any): Promise<void>;
    getAll(storeName: any, callback: any): Promise<void>;
}
export declare class MigrationsModel {
    databaseName: string;
    databaseVersion: number;
    migrations: any[];
    constructor(data?: {});
    DB(): indexedDBFIFO;
    static DB(): indexedDBFIFO;
    static insert(data: any): Promise<unknown>;
    save(): Promise<unknown>;
    static get(key: any): Promise<unknown>;
    static getAll(): Promise<any[]>;
}
export {};
