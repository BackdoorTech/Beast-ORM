var _a;
import { DBSwitch } from '../connection/dbSwtich.js';
export class ModelManager {
    constructor() { }
}
_a = ModelManager;
ModelManager.obj = (DatabaseSchema, TableSchema) => {
    return {
        create: async (arg) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'insert', arg);
        },
        get: async (arg) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg);
        },
        save: async (arg) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'update', arg);
        },
        execute: async (arg) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg);
        },
        update: async (arg) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'update', arg);
        },
        delete: async (arg) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'delete', arg);
        },
        all: async (arg) => {
            return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type, 'select', arg);
        },
    };
};
