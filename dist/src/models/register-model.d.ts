import { Model, LocalStorage } from './model.js';
import { DatabaseSchema, DatabaseSchemaLocalStorage, TableSchemaLocalStorage } from './register-modal.interface.js';
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
    ignoreFieldsStartWidth?: string[];
}
export declare const objModels: {};
export declare function migrate(register: register): void;
export declare class registerModel {
    static ModalName(): void;
    static register(entries: register): Promise<void>;
    static manyToManyRelationShip(foreignKeyField: ManyToManyField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): Model;
}
export declare class registerLocalStorage {
    static register(entries: register): Promise<void>;
    static edit(ModelName: any, databaseSchema: any, modelClassRepresentations: any, entries: any): void;
    static ModelName(modelClassRepresentations: typeof LocalStorage, DbName: any): string;
}
export declare class ModelEditor {
    static setTableSchemaLocalStorage(ModelToEdit: typeof LocalStorage, TableSchema: TableSchemaLocalStorage): void;
    static getDBSchemaLocalStorage(ModelToEdit: typeof LocalStorage, DatabaseSchema: DatabaseSchemaLocalStorage): void;
    static setTableSchema(ModelToEdit: typeof Model, DbName: any): void;
    static getDBSchema(ModelToEdit: typeof Model, DbName: any): void;
    static addMethodOneToOneField(foreignKeyField: OneToOneField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): void;
    static addMethodForeignKey(foreignKeyField: ForeignKey, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): void;
    static addMethodManyToManyField(foreignKeyField: ManyToManyField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): Promise<void>;
}
export {};
