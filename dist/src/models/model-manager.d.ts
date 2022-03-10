import { Method } from './model.interface.js';
import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
export declare class ModelManager {
    constructor();
    static obj: (DatabaseSchema: DatabaseSchema, TableSchema: TableSchema) => {
        create: (arg: Method[]) => Promise<any>;
    };
}
