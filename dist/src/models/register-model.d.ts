import { Model } from './model.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
interface register {
    databaseName: string;
    version: number;
    type: 'indexeddb' | 'memory';
    models: typeof Model[];
}
export declare const models: {};
export declare const modelsConfig: {
    [key: string]: {
        DatabaseSchema: DatabaseSchema;
        TableSchema: TableSchema;
    };
};
export declare class registerModel {
    static register(entries: register): Promise<void>;
}
export {};
