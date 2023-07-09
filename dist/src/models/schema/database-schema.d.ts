import { DatabaseSchema as DatabaseSchemaInterface } from '../register-modal.interface.js';
import { TableSchemaClass } from './table-schema.js';
export declare class DatabaseSchemaClass {
    name: string;
    version: string;
    tables: {
        [storeName: string]: TableSchemaClass;
    };
    config: DatabaseSchemaInterface;
    constructor({ config }: {
        config: DatabaseSchemaInterface;
    });
    getTable(name: any): TableSchemaClass;
}
