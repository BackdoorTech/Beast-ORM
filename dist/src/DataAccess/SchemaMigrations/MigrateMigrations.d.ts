import { IMigrations } from "./MakeMigration.type.js";
import { IDatabaseStrategy } from '../../DataAccess/DriverAdapters/DriverAdapter.type.js';
export declare class MigrateMigrations {
    prepareMigrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy): Promise<unknown>;
    migrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy): Promise<unknown>;
}
export declare const migrateMigrations: MigrateMigrations;
