export declare const methodsType: readonly ["filter"];
export type methodsTypeKeys = typeof methodsType[number];
export type methodsMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
export declare class methodFunction {
    private arg;
    private TableSchema;
    rows: any[];
    constructor(arg: any, TableSchema: any);
    cursor(row: object, resolve?: any, limit?: any): Promise<any[]>;
    cursorWithLimit(row: object, resolve?: any, limit?: any): Promise<any[]>;
    run(rows: any[]): Promise<any[]>;
}
export declare const methods: methodsMap<methodsTypeKeys, methodFunction>;
