import { DatabaseSchema } from "../../models/register-modal.interface.js";
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
    requestHandler: (currentStore: any, config: any) => {
        select: () => void;
        update: () => void;
        delete: () => void;
        insert: (...rows: any[]) => Promise<any>;
    };
}
export declare const indexedDB: _indexedDB;
export {};
