import { Model } from './model.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
import { OneToOneField, ForeignKey, ManyToManyField } from './field/allFields.js';
interface register {
    databaseName: string;
    version: number;
    type: 'indexedDB';
    models: typeof Model[];
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
export declare class registerModel {
    static register(entries: register): Promise<void>;
    static manyToManyRelationShip(foreignKeyField: ManyToManyField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): void;
}
export declare class ModelEditor {
    static addMethodOneToOneField(foreignKeyField: OneToOneField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): void;
    static addMethodForeignKey(foreignKeyField: ForeignKey, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): void;
    static addMethodManyToManyField(foreignKeyField: ManyToManyField, FieldName: string, modelName: string, databaseSchema: DatabaseSchema): Promise<void>;
}
export {};
