import { IMigrations } from "./MakeMigration.type.js";
export declare class MakeMigrations {
    needToMigrate: boolean;
    migrationIsUpToDate(Migrations: IMigrations): Promise<boolean>;
    make(Migrations: IMigrations): Promise<void>;
}
