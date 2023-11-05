import { IDatabaseStrategy } from "../DriverAdapters/DriverAdapter.type.js";
import { IMigrations } from "./MakeMigration.type.js";
import { MigrationsModel } from "./storage/DataSource/indexedDbPool.js";
import { migrationsStorageManager } from "./storage/MigrationsStorageManager.js";

export class MakeMigrations {

  needToMigrate = false

  async migrationIsUpToDate(Migrations: IMigrations) {
    const databaseName = Migrations.databaseName
    const migrations: MigrationsModel = await migrationsStorageManager.getMigrations(databaseName) as any


    return migrations.databaseVersion == Migrations.version
  }

  async make(Migrations: IMigrations) {

    const databaseName = Migrations.databaseName
    const hasMigration = await migrationsStorageManager.hasMigration(databaseName)

    // console.log("hasMigration")

    if(hasMigration) {
      // console.log("createMigrationUpdate")
      if(!await this.migrationIsUpToDate(Migrations)) {
        this.needToMigrate = true
        await migrationsStorageManager.createMigrationUpdate(Migrations)
      }

    } else {

      this.needToMigrate = true
      // console.log("createMigrationFirstTime")
      await migrationsStorageManager.createMigrationFirstTime(Migrations)
    }

  }

}
