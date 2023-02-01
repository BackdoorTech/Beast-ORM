import { DatabaseSchema } from "../../models/register-modal.interface";
import { DatabaseMemory } from './db.js';
export declare class MemoryConnector {
    constructor();
    private open;
    connect(config: DatabaseSchema): Promise<DatabaseMemory>;
    migrate(config: DatabaseSchema): Promise<boolean>;
    private runMigrations;
}
