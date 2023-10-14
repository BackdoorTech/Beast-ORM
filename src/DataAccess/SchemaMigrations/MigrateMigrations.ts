import { IMigrations } from "./MakeMigration.type.js";

export class MigrateMigrations{
  migrate(Migrations: IMigrations, IDatabaseStrategy: any) {}
}
export const migrateMigrations = new MigrateMigrations()
