export declare class IDatabaseStrategy {
    migrate(): Promise<void>;
    insert(table: any, data: any): Promise<void>;
    select(table: any, key: any): Promise<void>;
}
