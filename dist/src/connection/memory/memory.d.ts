import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface.js";
import { Method } from "../../models/model.interface.js";
import { DatabaseMemory } from './db.js';
export declare class Memory {
    private static validateStore;
    private static validateBeforeTransaction;
    static migrate(config: DatabaseSchema): Promise<boolean>;
    static getConnection(config: DatabaseSchema): Promise<DatabaseMemory>;
    static getActions: (currentStore: any, config: any) => {
        getAll: () => Promise<any[]>;
        add: (value: Object, key?: any) => Promise<number>;
        getByID(id: any): void;
        getOneByIndex(x: any, y: any): void;
        openCursor(func: any): void;
    };
    static requestHandler: (TableSchema: TableSchema, config: DatabaseSchema, queryId: any) => {
        select: (methods: Method[]) => Promise<unknown>;
        insert: (methods: Method[]) => Promise<{
            queryId: any;
            value: any;
        }>;
    };
}
