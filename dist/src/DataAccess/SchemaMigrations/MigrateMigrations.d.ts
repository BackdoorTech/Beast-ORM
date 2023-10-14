import { IMigrations } from "./MakeMigration.type.js";
export declare class MigrateMigrations {
    migrate(Migrations: IMigrations, IDatabaseStrategy: any): void;
}
export declare const migrateMigrations: MigrateMigrations;
