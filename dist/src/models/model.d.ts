import { getParams } from './model.interface.js';
import { DatabaseSchema, DatabaseSchemaLocalStorage, TableSchema } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
export declare class Model extends ModelManager {
    constructor(obg?: any);
    get(arg: any): Promise<any>;
    getDBSchema(): DatabaseSchema;
    getModelName(): string;
    filter(...arg: any[]): any;
    getTableSchema(): TableSchema;
    getPrimaryKeyValue(): any;
    save(): Promise<void>;
    delete(): Promise<void>;
    static deleteAll(): Promise<void>;
    all(): Promise<unknown>;
    getFields(arg: any): {};
    formValidation(data: any): boolean;
    Value(args: any): string;
    static Value(args: any): string;
    static formValidation(data: any): boolean;
    static getModelsFields(arg: any): Promise<void>;
    static all(): Promise<unknown>;
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
    private static newInstance;
    static createOrFind(getArg: any, defaultCreate: any): Promise<any[]>;
    static updateOrCreate(argToFind: any, argsToUpdate: any): Promise<any>;
    static update(arg: any): Promise<any>;
    static transactionOnCommit(callback: () => void): {
        queryId: string;
        subscribe: boolean;
        unsubscribe: () => Promise<unknown>;
    };
    static ReactiveList(callback: (Model: Model) => void): {
        readonly value: any[];
        readonly subscribe: any;
        unsubscribe: () => Promise<any>;
    };
    static object: ({ queryId, DBconfig, TableSchema, some }: {
        queryId: any;
        DBconfig: any;
        TableSchema: any;
        some?: any;
    }) => {
        filter: (...args: any[]) => any;
        execute: () => Promise<unknown>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<unknown>;
    };
}
export declare class LocalStorage {
    constructor();
    static save(data?: Object): void;
    static get(): any;
    static getModelName(): string;
    static getDBSchema(): DatabaseSchemaLocalStorage;
    static getTableSchema(): TableSchema;
    private static getIgnoreAttributes;
    static ignoreAttributes(attributesStartWidth?: string[]): void;
    private static getFields;
    private static formValidation;
    static clear(): void;
    static clearComponent(): void;
    static clearStorage(): void;
}
