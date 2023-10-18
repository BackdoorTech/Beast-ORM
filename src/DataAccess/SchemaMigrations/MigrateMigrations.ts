import { IMigrations } from "./MakeMigration.type.js";
import { IDatabaseStrategy } from '../../DataAccess/DriverAdapters/DriverAdapter.type.js'

export class MigrateMigrations{
  migrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy) {
    DatabaseStrategy.migrate(Migrations)
  }
}
export const migrateMigrations = new MigrateMigrations()
