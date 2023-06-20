import { Methods, Method } from './model.interface.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
export declare class ModelAPIRequest {
    constructor();
    static obj: (DatabaseSchema: DatabaseSchema, TableSchema?: TableSchema) => {
        create: (args: Method[], queryId: string, callback: any) => Promise<void>;
        get: (arg: Method[], queryId: string) => Promise<unknown>;
        save: (arg: Method[], queryId: string) => Promise<unknown>;
        execute: (arg: Methods | Method[], queryId: string) => Promise<any>;
        update: (arg: any, queryId: string) => Promise<unknown>;
        delete: (arg: any, queryId: string) => Promise<unknown>;
        all: (arg: any, queryId: string) => Promise<any>;
        migrate: (queryId?: string) => Promise<unknown>;
        trigger: (args: any, Subscription: string, callback: Function) => Promise<void>;
    };
}
