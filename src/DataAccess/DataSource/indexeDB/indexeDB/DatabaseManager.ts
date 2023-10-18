import { DatabaseService } from "./DatabaseService.js"
import { IDatabaseSchema } from "./DatabaseService.type.js"

class DatabaseManager {

  databases: {[databaseName: string]: DatabaseService }  = {}

  async prepare(config:IDatabaseSchema) {
    this.databases[config.databaseName] = new DatabaseService(config)
    await this.databases[config.databaseName].migrate()
  }

  getDb(databaseName) {
    return this.databases[databaseName]
  }

}

export const databaseManager = new DatabaseManager()

