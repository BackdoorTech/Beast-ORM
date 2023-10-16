import { CallbackScheduler } from "../../../Utility/scheduler/callbackScheduler.js";
import { MigrationsModels } from "./DataSource/indexedDbPool.type.js";
import { IMigrations } from '../MakeMigration.type.js';
export declare class MigrationsStorageManager {
    private MigrationsModel;
    private allMigrations;
    /**
     * @description wait until `MigrationsStorageManager.getRegisteredMigrations()` has finish executing
     */
    waitMigrationsList: CallbackScheduler;
    constructor();
    private getRegisteredMigrations;
    getAllMigrations: (...args: any) => Promise<MigrationsModels>;
    hasMigration: (...args: any) => Promise<unknown>;
    getMigrations: (...args: any) => Promise<unknown>;
    createMigrationFirstTime(Migrations: IMigrations): Promise<void>;
    createMigrationUpdate(Migrations: IMigrations): Promise<void>;
}
export declare const migrationsStorageManager: MigrationsStorageManager;
