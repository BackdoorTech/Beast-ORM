import { Methods, Method } from './model.interface.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
export declare class ModelManager {
    constructor();
    static obj: (DatabaseSchema: DatabaseSchema, TableSchema: TableSchema) => {
        create: (arg: Method[]) => Promise<any>;
        get: (arg: Method[]) => Promise<any>;
        save: (arg: Method[]) => Promise<any>;
        execute: (arg: Methods | Method[]) => Promise<any>;
        update: (arg: any) => Promise<any>;
        delete: (arg: any) => Promise<any>;
        all: (arg: any) => Promise<any>;
    };
}
