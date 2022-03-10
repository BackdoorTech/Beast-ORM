export declare class ObjectConditionOperator {
    private row;
    private tableSchema;
    constructor(row: any, tableSchema: any);
    run(args: any): Promise<boolean | any>;
    private execute;
}
