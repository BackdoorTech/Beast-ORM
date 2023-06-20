import { getParams } from './model.interface.js';
import { DatabaseSchema, DatabaseSchemaLocalStorage, TableSchema } from './register-modal.interface.js';
export declare class Model {
    constructor();
    get(arg: any): Promise<any>;
    getDBSchema(): DatabaseSchema;
    getModelName(): string;
    filter(...arg: any[]): {
        filter: (...args: any[]) => void;
        execute: () => Promise<any[]>;
        update: (args: any) => Promise<unknown>;
        delete: () => Promise<unknown>;
        all: () => Promise<any[]>;
    };
    getTableSchema(): TableSchema;
    getPrimaryKeyValue(): any;
    private setDataToInstance;
    private static setDataToInstance;
    save(): Promise<void>;
    delete(): Promise<void>;
    static deleteAll(): Promise<void>;
    all(): Promise<any[]>;
    getFields(arg: any): {};
    formValidation(data: any): boolean;
    Value(args: any): string;
    static Value(args: any): string;
    static formValidation(data: any): boolean;
    static getModelsFields(arg: any): Promise<void>;
    static all(): Promise<any[]>;
    static get(arg: getParams): Promise<any>;
    static getOrCreate(arg: getParams): Promise<any>;
    private static getId;
    static getModelName(): string;
    static filter(...arg: any[]): {
        filter: (...args: any[]) => void;
        execute: () => Promise<any[]>;
        update: (args: any) => Promise<unknown>;
        delete: () => Promise<unknown>;
        all: () => Promise<any[]>;
    };
    static getDBSchema(): DatabaseSchema;
    static getTableSchema(): TableSchema;
    private static getEmptyFields;
    private static getFields;
    static create(arg: any): Promise<any>;
    private static newInstance;
    static createOrFind(getArg: any, defaultCreate: any): Promise<any[]>;
    static updateOrCreate(...args: any[]): Promise<any>;
    static update(arg: any): Promise<unknown>;
    static transactionOnCommit(callback: () => void): {
        queryId: string;
        subscribe: boolean;
        unsubscribe: () => Promise<unknown>;
    };
    static ReactiveList(callback: (Model: Model) => void): {
        readonly value: any;
        readonly subscribe: any;
        unsubscribe: () => Promise<any>;
        setUpdateUi(func: any): void;
    };
    static object: ({ queryId, DBconfig, TableSchema, some }: {
        queryId: any;
        DBconfig: any;
        TableSchema: any;
        some?: any;
    }) => {
        filter: (...args: any[]) => void;
        execute: () => Promise<any[]>;
        update: (args: any) => Promise<unknown>;
        delete: () => Promise<unknown>;
        all: () => Promise<any[]>;
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
