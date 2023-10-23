import { CallbackScheduler } from "../../../Utility/scheduler/callbackScheduler.js";
import { MigrationsModel } from "./DataSource/indexedDbPool.js";
export class MigrationsStorageManager {
    constructor() {
        this.MigrationsModel = MigrationsModel;
        this.allMigrations = [];
        /**
         * @description wait until `MigrationsStorageManager.getRegisteredMigrations()` has finish executing
         */
        this.waitMigrationsList = new CallbackScheduler();
        this.getAllMigrations = this.waitMigrationsList.function(() => {
            return this.allMigrations;
        });
        this.hasMigration = this.waitMigrationsList.function((name) => {
            return this.allMigrations.find(e => e.databaseName == name);
        });
        this.getMigrations = this.waitMigrationsList.function((name) => {
            return this.allMigrations.find(e => e.databaseName == name);
        });
        this.getRegisteredMigrations();
    }
    async getRegisteredMigrations() {
        this.allMigrations = await this.MigrationsModel.getAll();
        this.waitMigrationsList.start();
    }
    async createMigrationFirstTime(Migrations) {
        const data = {
            databaseName: Migrations.databaseName,
            databaseVersion: Migrations.version,
            migrations: Migrations.table
        };
        await this.MigrationsModel.insert(data);
    }
    async createMigrationUpdate(Migrations) {
        const dataBaseName = Migrations.databaseName;
        const migrations = await this.getMigrations(dataBaseName);
        migrations.databaseVersion = Migrations.version;
        migrations.migrations.push(Migrations.table);
        const updateMigrations = new MigrationsModel(migrations);
        await updateMigrations.save();
    }
}
export const migrationsStorageManager = new MigrationsStorageManager();
