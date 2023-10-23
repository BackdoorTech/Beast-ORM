import { CallbackScheduler } from "../../../Utility/scheduler/callbackScheduler.js"
import { MigrationsModel } from "./DataSource/indexedDbPool.js"
import { MM, MigrationsModels } from "./DataSource/indexedDbPool.type.js"
import { IMigrations } from '../MakeMigration.type.js'

export class MigrationsStorageManager {

  private MigrationsModel = MigrationsModel
  private allMigrations: MigrationsModel[] = []
  /**
   * @description wait until `MigrationsStorageManager.getRegisteredMigrations()` has finish executing
   */
  waitMigrationsList = new CallbackScheduler()

  constructor() {
    this.getRegisteredMigrations()
  }

  private async getRegisteredMigrations() {
    this.allMigrations = await this.MigrationsModel.getAll()

    this.waitMigrationsList.start()
  }

  getAllMigrations = this.waitMigrationsList.function<MigrationsModels>(()=> {
    return this.allMigrations
  })

  hasMigration = this.waitMigrationsList.function((name) => {
    return this.allMigrations.find(e => e.databaseName == name)
  })

  getMigrations = this.waitMigrationsList.function((name) => {
    return this.allMigrations.find(e => e.databaseName == name)
  })

  async createMigrationFirstTime(Migrations: IMigrations) {
    const data = {
      databaseName: Migrations.databaseName,
      databaseVersion: Migrations.version,
      migrations:  Migrations.table
    }
    await this.MigrationsModel.insert(data)
  }

  async createMigrationUpdate(Migrations: IMigrations) {

    const dataBaseName = Migrations.databaseName
    const migrations: MigrationsModel = await this.getMigrations(dataBaseName) as any

    migrations.databaseVersion = Migrations.version
    migrations.migrations.push(Migrations.table)

    const updateMigrations = new MigrationsModel(migrations)
    await updateMigrations.save()

  }
}

export const migrationsStorageManager = new MigrationsStorageManager()
