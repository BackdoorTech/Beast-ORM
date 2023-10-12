import { Model, LocalStorage } from './model.js';
import { DatabaseSchema, DatabaseSchemaLocalStorage, TableSchemaLocalStorage } from './register-modal.interface.js';
import { OneToOneField, ForeignKey, ManyToManyField } from './field/allFields.js';
/**
 * @interface register
 * @description Represents the configuration options for registering models.
 * @property {string} databaseName - The name of the database.
 * @property {number} version - The version of the database schema.
 * @property {'indexedDB' | 'localStorage'} type - The type of storage ('indexedDB' or 'localStorage').
 * @property {typeof Model[] | typeof LocalStorage[]} models - An array of model classes to be registered.
 * @property {boolean} [restore] - Whether to restore values from localStorage for LocalStorage Models.
 * @property {string[]} [ignoreFieldsStartWidth] - An array of field names to ignore.
 */
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
/**
 * @function migrate
 * @description Migrates models based on the registration type (indexedDB or localStorage).
 * @param {register} register - The registration configuration.
 */
export declare function migrate(register: register): void;
/**
 * @class registerModel
 * @description Manages the registration of models for indexedDB storage.
 */
export declare class registerModel {
    static ModalName(): void;
    static register(entries: register): {
        wait(): Promise<any>;
    };
    static manyToManyRelationShip(foreignKeyField: ManyToManyField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): Model;
}
/**
 * @class registerLocalStorage
 * @description Manages the registration of models for localStorage.
 */
export declare class registerLocalStorage {
    /**
     * @function register
     * @description Registers models for localStorage storage.
     * @param {register} entries - The registration configuration.
     */
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
