import { DatabaseSchema } from '../../models/register-modal.interface.js';
export declare class IndexedDBConnection {
    constructor();
    connect(config: DatabaseSchema): Promise<IDBDatabase>;
    migrate(config: DatabaseSchema): Promise<boolean>;
    private runMigrations;
}
