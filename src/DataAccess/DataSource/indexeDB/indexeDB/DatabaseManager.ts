import { IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.type.js"
import { DatabaseService } from "./DatabaseService.js"

class DatabaseManager {

  databases: {[databaseName: string]: DatabaseService }  = {}

  async migrate(config:IDatabaseSchema) {
    await this.databases[config.databaseName].migrate()
  }

  async prepare(config:IDatabaseSchema) {
    this.databases[config.databaseName] = new DatabaseService(config)
  }

  getDb(databaseName) {
    return this.databases[databaseName]
  }

  getTableSchema(databaseName, tableName) {
    return this.databases[databaseName].objectStore[tableName].schema
  }
}

export const databaseManager = new DatabaseManager()

