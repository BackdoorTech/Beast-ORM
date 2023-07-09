import { DatabaseSchema as  DatabaseSchemaInterface } from "../register-modal.interface.js"
import { DatabaseSchemaClass } from "./database-schema.js"

export class DatabaseManagerSchema {
    private static databases: {[databaseName: string]: DatabaseSchemaClass }  = {}

    static async prepare(config:DatabaseSchemaInterface) {
      this.databases[config.databaseName] = new DatabaseSchemaClass({config})
    }
  
    static getDb(databaseName) {
      return this.databases[databaseName]
    }
}