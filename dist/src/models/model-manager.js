var _a;
import { DBSwitch } from '../connection/dbSwtich.js';
import { ModelMigrations } from './mode-migrations.js';
import { uniqueGenerator } from '../utils.js';
export class ModelAPIRequest {
    constructor() { }
}
_a = ModelAPIRequest;
ModelAPIRequest.obj = (DatabaseSchema, TableSchema) => {
    return {
        create: async (arg, queryId) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'insert', arg, queryId);
        },
        get: async (arg, queryId) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg, queryId);
        },
        save: async (arg, queryId) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'update', arg, queryId);
        },
        execute: async (arg, queryId) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg, queryId);
        },
        update: async (arg, queryId) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'update', arg, queryId);
        },
        delete: async (arg, queryId) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'delete', arg, queryId);
        },
        all: async (arg, queryId) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg, queryId);
        },
        migrate: async (queryId = uniqueGenerator()) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'migrate', {}, queryId);
        }, trigger: async (args, Subscription, callback) => {
            await ModelMigrations.waitMigration(DatabaseSchema.databaseName);
            DBSwitch.callBackRequestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'trigger', args, callback, Subscription);
        }
    };
};
