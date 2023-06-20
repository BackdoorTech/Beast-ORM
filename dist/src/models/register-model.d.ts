import { Model, LocalStorage } from './model.js';
import { DatabaseSchema, DatabaseSchemaLocalStorage, TableSchema, TableSchemaLocalStorage } from './register-modal.interface.js';
import { OneToOneField, ForeignKey, ManyToManyField } from './field/allFields.js';
interface register {
    databaseName: string;
    version: number;
    type: 'indexedDB' | 'localStorage';
    models: typeof Model[] | typeof LocalStorage[];
    /**
     * @description restore values from localStorage for LocalStorage Models
     */
    restore?: boolean;
}
export declare const models: {};
export declare const modelsConfig: {
    [key: string]: {
        DatabaseSchema: DatabaseSchema;
        TableSchema: TableSchema;
        OneToOneField?: {
            [key: string]: {};
        };
    };
};
export declare const modelsLocalStorage: {};
export declare const modelsConfigLocalStorage: {
    [key: string]: {
        DatabaseSchema: DatabaseSchemaLocalStorage;
        TableSchema: TableSchemaLocalStorage;
    };
};
export declare function migrate(register: register): void;
export declare class registerModel {
    static register(entries: register): Promise<void>;
    static manyToManyRelationShip(foreignKeyField: ManyToManyField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): Model;
}
export declare class registerLocalStorage {
    static register(entries: register): Promise<void>;
}
export declare class ModelEditor {
    static addMethodOneToOneField(foreignKeyField: OneToOneField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): void;
    static addMethodForeignKey(foreignKeyField: ForeignKey, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): void;
    static addMethodManyToManyField(foreignKeyField: ManyToManyField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): Promise<void>;
}
export {};
