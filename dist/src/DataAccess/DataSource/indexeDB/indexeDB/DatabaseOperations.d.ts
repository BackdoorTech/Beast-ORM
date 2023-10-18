export declare class DatabaseOperations {
    db: any;
    constructor(db: any);
    insert(storeName: any, data: any): Promise<unknown>;
}
