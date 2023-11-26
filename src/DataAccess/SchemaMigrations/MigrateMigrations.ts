import { IMigrations } from "./MakeMigration.type.js";
import { IDatabaseStrategy } from '../../DataAccess/DriverAdapters/DriverAdapter.type.js'

export class MigrateMigrations{
  async prepareMigrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy) {
    return new Promise((resolve, reject)=> {
      const request = DatabaseStrategy.prepare(Migrations)({
        onerror:()=>{},
        onsuccess:()=> {},
        done:() => {
          resolve(true)
        }
      })
    })
  }

  async migrate(Migrations: IMigrations, DatabaseStrategy: IDatabaseStrategy) {
    return new Promise((resolve, reject)=> {
      DatabaseStrategy.migrate(Migrations)({
        onerror:()=>{},
        onsuccess:()=> {},
        done() {
          resolve(true)
        }
      })
    })
  }
}
export const migrateMigrations = new MigrateMigrations()
