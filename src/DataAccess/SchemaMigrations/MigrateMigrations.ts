import { IMigrations } from "./MakeMigration.type.js";
import { IDatabaseStrategy } from '../../DataAccess/DriverAdapters/DriverAdapter.type.js'

export class MigrateMigrations{
  async prepareMigrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy) {
    return new Promise((resolve, reject)=> {
      DatabaseStrategy.prepare(Migrations)({
        done:() => {
          resolve(true)
        }
      })
    })
  }

  async migrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy) {
    return new Promise((resolve, reject)=> {
      DatabaseStrategy.migrate(Migrations)({
        done() {
          resolve(true)
        }
      })
    })
  }
}
export const migrateMigrations = new MigrateMigrations()
