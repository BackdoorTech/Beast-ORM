import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface.js";
import { Method } from "../../models/model.interface.js";
declare class _indexedDB {
    private validateStore;
    private validateBeforeTransaction;
    private createTransaction;
    migrate(config: DatabaseSchema): Promise<boolean>;
    getConnection(config: DatabaseSchema): Promise<IDBDatabase>;
    getActions: (currentStore: any, config: any) => {
        getByID: (id: string | number) => Promise<any>;
        getOneByIndex: (keyPath: string, value: string | number) => Promise<any>;
        getManyByIndex: (keyPath: string, value: string | number) => Promise<any[]>;
        getAll: () => Promise<any[]>;
        add: (value: Object, key?: any) => Promise<number>;
        update: (value: any, key?: any) => Promise<any>;
        deleteByID: (id: any) => Promise<any>;
        deleteAll: () => Promise<any>;
        openCursor: (cursorCallback: any, keyRange?: IDBKeyRange) => Promise<void | IDBCursorWithValue>;
    };
    requestHandler: (TableSchema: TableSchema, config: DatabaseSchema) => {
        select: (methods: Method[]) => Promise<any>;
        update: (methods: Method[]) => Promise<void>;
        delete: (methods: Method[]) => Promise<void>;
        insert: (methods: Method[]) => Promise<any>;
    };
}
export declare const indexedDB: _indexedDB;
export {};
