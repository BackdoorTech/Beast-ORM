import { IDatabaseStrategy } from "../DriverAdapters/DriverAdapter.type.js";
import { IMigrations } from "./MakeMigration.type.js";
export declare class MakeMigrations {
    needToMigrate: boolean;
    make(Migrations: IMigrations, Function: IDatabaseStrategy): void;
}
