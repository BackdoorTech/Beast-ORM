import { DatabaseSchema } from "../../models/register-modal.interface.js";
export declare class IndexedDBConnector {
    static connect(config: DatabaseSchema): Promise<IDBDatabase>;
    static migrate(config: DatabaseSchema): Promise<boolean>;
    private static runMigrations;
}
