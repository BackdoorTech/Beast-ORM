import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface.js";
import { Method } from "../../models/model.interface.js";
import { Database } from "./database.js";
declare class indexedDBInterface {
    getActions: (TableName: string, Database: Database, queryId: string) => {
        getByID: (id: string | number) => Promise<any>;
        getOneByIndex: (keyPath: string, value: string | number) => Promise<any>;
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
    };
    requestHandler: (TableName: string, DatabaseName: string, queryId: any, PostMessage?: typeof postMessage) => {
        select: (methods: Method[]) => Promise<unknown>;
        update: (methods: Method[]) => Promise<void>;
        delete: (methods: Method[]) => Promise<void>;
        insert: (methods: Method[]) => Promise<void>;
        migrate: ({ DatabaseSchema, TableSchema }: {
            DatabaseSchema: DatabaseSchema;
            TableSchema: TableSchema;
        }) => Promise<void>;
        trigger: ({ type, subscribe }: {
            type: any;
            subscribe: any;
        }) => Promise<void>;
    };
}
export declare const indexedDB: indexedDBInterface;
export {};
