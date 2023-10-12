export declare const methodsType: readonly ["filter"];
export declare type methodsTypeKeys = typeof methodsType[number];
export declare type methodsMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
export declare class methodFunction {
    private arg;
    private TableSchema;
    rows: any[];
    constructor(arg: any, TableSchema: any);
    cursor(row: object, resolve?: any, limit?: any): Promise<void>;
    run(rows: any[]): Promise<any[]>;
}
export declare const methods: methodsMap<methodsTypeKeys, methodFunction>;
