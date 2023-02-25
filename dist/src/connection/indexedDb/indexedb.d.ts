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
        add: ({ value, key, func }: {
            value: any;
            key: any;
            func: any;
        }) => void;
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
        update: (methods: Method[]) => Promise<{
            queryId: any;
        }>;
        delete: (methods: Method[]) => Promise<{
            queryId: any;
            value?: undefined;
        } | {
            queryId: any;
            value: any;
        }>;
        insert: (methods: Method[]) => Promise<unknown>;
        migrate: () => Promise<{
            queryId: any;
        }>;
        trigger: ({ type, subscribe }: {
            type: any;
            subscribe: any;
        }) => Promise<{
            subscription: boolean;
            queryId: any;
        }>;
    };
}
export declare const indexedDB: indexedDBInterface;
export {};
