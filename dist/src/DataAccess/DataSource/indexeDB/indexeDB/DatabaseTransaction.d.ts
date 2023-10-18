export declare class DatabaseTransaction {
    db: any;
    constructor(db: any);
    startTransaction(storeNames: any, mode: any): Promise<any>;
}
