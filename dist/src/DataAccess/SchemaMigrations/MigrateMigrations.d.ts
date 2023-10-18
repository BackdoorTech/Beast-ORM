import { IMigrations } from "./MakeMigration.type.js";
import { IDatabaseStrategy } from '../../DataAccess/DriverAdapters/DriverAdapter.type.js';
export declare class MigrateMigrations {
    migrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy): void;
}
export declare const migrateMigrations: MigrateMigrations;
