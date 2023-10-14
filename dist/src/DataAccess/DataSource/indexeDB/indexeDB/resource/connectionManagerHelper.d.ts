import { FieldSchema } from "./type.js";
declare class ConnectionManagerHelper {
    /**
     * Checks if an object store with the given name already exists in the database.
     * @param db - The IndexedDB database instance.
     * @param name - The name of the object store.
     * @returns `true` if the object store exists, `false` otherwise.
     */
    storeExist(db: IDBDatabase, name: string): boolean;
    /**
     * Creates an object store in the database.
     * @param db - The IndexedDB database instance.
     * @param idObject - The ID object for the object store.
     * @param tableName - The name of the object store.
     * @returns The created IDBObjectStore instance.
     */
    createObjectStore(db: IDBDatabase, idObject: any, tableName: any): IDBObjectStore;
    /**
     * Creates an index (column) in the specified object store.
     * @param objectStore - The IDBObjectStore in which to create the index.
     * @param fieldSchema - The field schema containing index information.
     */
    createColumn(objectStore: IDBObjectStore, fieldSchema: FieldSchema): void;
}
export declare const connectionManagerHelper: ConnectionManagerHelper;
export {};
