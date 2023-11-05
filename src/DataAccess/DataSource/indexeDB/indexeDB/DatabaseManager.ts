import { IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.js"
import { DatabaseService } from "./DatabaseService.js"

class DatabaseManager {

  databases: {[databaseName: string]: DatabaseService }  = {}

  async migrate(config:IDatabaseSchema) {
    //console.log("migrate db")
    await this.databases[config.databaseName].migrate()
  }

  async prepare(config:IDatabaseSchema) {
    //console.log("create db connection")
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

