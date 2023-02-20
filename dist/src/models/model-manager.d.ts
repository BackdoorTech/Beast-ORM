import { Methods, Method } from './model.interface.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
export declare class ModelManager {
    constructor();
    static obj: (DatabaseSchema: DatabaseSchema, TableSchema: TableSchema) => {
        create: (arg: Method[], queryId: string) => Promise<any>;
        get: (arg: Method[], queryId: string) => Promise<any>;
        save: (arg: Method[], queryId: string) => Promise<any>;
        execute: (arg: Methods | Method[], queryId: string) => Promise<any>;
        update: (arg: any, queryId: string) => Promise<any>;
        delete: (arg: any, queryId: string) => Promise<any>;
        all: (arg: any, queryId: string) => Promise<any>;
        migrate: (queryId?: string) => Promise<any>;
        trigger: (queryId: any, Subscription: any) => Promise<any>;
    };
}
