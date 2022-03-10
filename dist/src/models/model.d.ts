import { getParams } from './model.interface.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
export declare class Model extends ModelManager {
    BeastOrmId: any;
    constructor(obg?: any);
    get(arg: any): Promise<any>;
    setDBConfig(config: DatabaseSchema): void;
    getDBSchema(): DatabaseSchema;
    getModelName(): any;
    filter(...arg: any[]): typeof Model & {
        filter: (...args: any[]) => typeof Model & any;
        execute: () => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<any>;
    };
    getTableSchema(): TableSchema;
    save(): Promise<void>;
    create(arg: any): Promise<any>;
    delete(): Promise<void>;
    all(): Promise<{
        filter: (...args: any[]) => typeof Model & any;
        execute: () => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<any>;
    }>;
    static all(): Promise<{
        filter: (...args: any[]) => typeof Model & any;
        execute: () => Promise<any>;
        update: (args: any) => Promise<any>;
        delete: () => Promise<any>;
        all: () => Promise<any>;
    }>;
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
    static setDBConfig(config: DatabaseSchema): void;
    static getDBSchema(): DatabaseSchema;
    static getTableSchema(): TableSchema;
    static create(arg: any): Promise<any>;
    static updateOrCreate(argToFind: any, argsToUpdate: any): Promise<any>;
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
