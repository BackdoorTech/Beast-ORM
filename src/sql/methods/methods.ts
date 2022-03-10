import { filter } from './filter.js'


export const methodsType = [
    'filter',
] as const; // TS3.4 syntax

export type methodsTypeKeys = typeof methodsType[number]; 
export type methodsMap<K extends string | number | symbol, T> = { [P in K]?: T; };

export declare class methodFunction {
    private arg;
    private TableSchema;
    rows: any[];
    constructor(arg: any, TableSchema: any);
    cursor(row: object): Promise<void>;
    run(rows: any[]): Promise<any[]>;
}


export const methods:  methodsMap<methodsTypeKeys, methodFunction> = {
    filter: filter as any
}
