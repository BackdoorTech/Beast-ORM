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
        }
    };
};
