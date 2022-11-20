var _a;
import { DBSwitch } from '../connection/dbSwtich.js';
import { ModelMigrations } from './mode-migrations.js';
export class ModelManager {
    constructor() { }
}
_a = ModelManager;
ModelManager.obj = (DatabaseSchema, TableSchema) => {
    return {
        create: async (arg, queryId) => {
            await ModelMigrations.waitMigration();
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'insert', arg, queryId);
        },
        get: async (arg, queryId) => {
            await ModelMigrations.waitMigration();
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg, queryId);
        },
        save: async (arg, queryId) => {
            await ModelMigrations.waitMigration();
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'update', arg, queryId);
        },
        execute: async (arg, queryId) => {
            await ModelMigrations.waitMigration();
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg, queryId);
        },
        update: async (arg, queryId) => {
            await ModelMigrations.waitMigration();
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'update', arg, queryId);
        },
        delete: async (arg, queryId) => {
            await ModelMigrations.waitMigration();
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'delete', arg, queryId);
        },
        all: async (arg, queryId) => {
            await ModelMigrations.waitMigration();
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg, queryId);
        },
    };
};
