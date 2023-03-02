import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface.js";
import { Method } from "../../models/model.interface.js";
declare class indexedDBInterface {
    private validateStore;
    private validateBeforeTransaction;
    private createTransaction;
    migrate(config: DatabaseSchema): Promise<boolean>;
    getConnection(config: DatabaseSchema): Promise<IDBDatabase>;
    getActions: (currentStore: any, config: any, queryId: any) => {
        getByID: (id: string | number) => Promise<any>;
        getOneByIndex: (keyPath: string, value: string | number) => Promise<any>;
        getManyByIndex: (keyPath: string, value: string | number) => Promise<any[]>;
        getAll: () => Promise<any[]>;
        add: ({ value, key, add, index }: {
            value: any;
            key: any;
            add: any;
            index: any;
        }) => Promise<unknown>;
        update: ({ value, key }: {
            value: any;
            key?: any;
        }) => Promise<any>;
        deleteByID: (id: any) => Promise<any>;
        deleteAll: () => Promise<any>;
        openCursor: (cursorCallback: any, keyRange?: IDBKeyRange) => Promise<void | IDBCursorWithValue>;
    };
    requestHandler: (TableSchema: TableSchema, config: DatabaseSchema, queryId: any) => {
        select: (methods: Method[]) => Promise<unknown>;
        update: (methods: Method[]) => Promise<void>;
        delete: (methods: Method[]) => Promise<void>;
        insert: (methods: Method[]) => Promise<void>;
        migrate: () => Promise<void>;
        trigger: ({ type, subscribe }: {
            type: any;
            subscribe: any;
        }) => Promise<{
            run: string;
            subscription: boolean;
            queryId: any;
            value: boolean;
        }>;
    };
}
export declare const indexedDB: indexedDBInterface;
export {};
