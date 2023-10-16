import { migrationsStorageManager } from "./storage/MigrationsStorageManager.js";
export class MakeMigrations {
    constructor() {
        this.needToMigrate = false;
    }
    async migrationIsUpToDate(Migrations) {
        const databaseName = Migrations.databaseName;
        const migrations = await migrationsStorageManager.getMigrations(databaseName);
        return migrations.databaseVersion == Migrations.version;
    }
    async make(Migrations) {
        const databaseName = Migrations.databaseName;
        const hasMigration = await migrationsStorageManager.hasMigration(databaseName);
        console.log("hasMigration");
        if (hasMigration) {
            console.log("createMigrationUpdate");
            if (!await this.migrationIsUpToDate(Migrations)) {
                this.needToMigrate = true;
                await migrationsStorageManager.createMigrationUpdate(Migrations);
            }
        }
        else {
            this.needToMigrate = true;
            console.log("createMigrationFirstTime");
            await migrationsStorageManager.createMigrationFirstTime(Migrations);
        }
        console.log("realizes");
    }
}
