import { getParams } from './model.interface.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
export declare class Model extends ModelManager {
    constructor(obg?: any);
    get(arg: any): Promise<any>;
    getDBSchema(): DatabaseSchema;
    getModelName(): string;
    filter(...arg: any[]): any;
    getTableSchema(): TableSchema;
    private getPrimaryKeyValue;
    save(): Promise<void>;
    delete(): Promise<void>;
    all(): Promise<any>;
    getFields(arg: any): {};
    formValidation(data: any): boolean;
    static formValidation(data: any): boolean;
    static getModelsFields(arg: any): Promise<void>;
    static all(): Promise<any>;
    static get(arg: getParams): Promise<any>;
    private static getId;
    static getModelName(): string;
    static filter(...arg: any[]): any;
    static NewModelInstance(): any;
    static getDBSchema(): DatabaseSchema;
    static getTableSchema(): TableSchema;
    private static getEmptyFields;
    private static getFields;
    static create(arg: any): Promise<any>;
    private static getPrimaryKeyValue;
    private static newInstance;
    static createOrFind(getArg: any, defaultCreate: any): Promise<any[]>;
    static updateOrCreate(argToFind: any, argsToUpdate: any): Promise<any>;
    static update(arg: any): Promise<any>;
    static object: ({ queryId, DBconfig, TableSchema, some }: {
        queryId?: string;
        DBconfig: any;
        TableSchema: any;
        some?: any;
    }) => {
        filter: (...args: any[]) => any;
        execute: () => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<any>;
    };
}
