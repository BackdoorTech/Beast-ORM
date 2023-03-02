import { DatabaseSchema, TableSchema } from '../../models/register-modal.interface.js';
export declare const Databases: {
    [databaseName: string]: DatabaseSchema;
};
export declare const Tables: {
    [databaseName: string]: {
        [table: string]: TableSchema;
    };
};
