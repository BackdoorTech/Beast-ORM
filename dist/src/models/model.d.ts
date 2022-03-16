import { getParams } from './model.interface.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
export declare class Model extends ModelManager {
    constructor(obg?: any);
    get(arg: any): Promise<any>;
    getDBSchema(): DatabaseSchema;
    getModelName(): string;
    filter(...arg: any[]): typeof Model & {
        filter: (...args: any[]) => typeof Model & any;
        execute: () => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<any>;
    };
    getTableSchema(): TableSchema;
    private getPrimaryKeyValue;
    save(): Promise<void>;
    delete(): Promise<void>;
    all(): Promise<any>;
    static getModelsFields(arg: any): Promise<void>;
    static all(): Promise<any>;
    static get(arg: getParams): Promise<any>;
    private static getId;
    static getModelName(): string;
    static filter(...arg: any[]): typeof Model & {
        filter: (...args: any[]) => typeof Model & any;
        execute: () => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<any>;
    };
    static getDBSchema(): DatabaseSchema;
    static getTableSchema(): TableSchema;
    private static getEmptyFields;
    static create(arg: any): Promise<any>;
    private static getPrimaryKeyValue;
    private static newInstance;
    static createOrFind(getArg: any, defaultCreate: any): Promise<any[]>;
    static updateOrCreate(argToFind: any, argsToUpdate: any): Promise<any>;
    static update(arg: any): Promise<any>;
    static object: ({ queryId, some, DBconfig, TableSchema }: {
        queryId?: string;
        some?: any;
        DBconfig: any;
        TableSchema: any;
    }) => {
        filter: (...args: any[]) => typeof Model & any;
        execute: () => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<any>;
    };
}
