export declare class filter {
    private arg;
    private TableSchema;
    rows: any[];
    constructor(arg: any, TableSchema: any);
    cursor(row: object): Promise<void>;
    run(rows: any[]): Promise<any[]>;
}
