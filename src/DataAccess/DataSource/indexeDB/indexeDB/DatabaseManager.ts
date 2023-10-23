import { DatabaseService } from "./DatabaseService.js"
import { IDatabaseSchema } from "./DatabaseService.type.js"

class DatabaseManager {

  databases: {[databaseName: string]: DatabaseService }  = {}

  async migrate(config:IDatabaseSchema) {
    console.log("migrate db")
    await this.databases[config.databaseName].migrate()
  }

  async prepare(config:IDatabaseSchema) {
    console.log("create db connection")
    this.databases[config.databaseName] = new DatabaseService(config)
  }

  getDb(databaseName) {
    return this.databases[databaseName]
  }

}

export const databaseManager = new DatabaseManager()

