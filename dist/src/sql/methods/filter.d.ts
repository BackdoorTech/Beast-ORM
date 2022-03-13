export declare class filter {
    private arg;
    private TableSchema;
    rows: any[];
    constructor(arg: any, TableSchema: any);
    cursor(row: object, resolve?: any, limit?: any): Promise<void>;
    run(rows: any[]): Promise<any[]>;
}
