import { DatabaseSchema } from "../../models/register-modal.interface.js";
import { Database } from "./database.js";

// inspire by https://github.com/hc-oss/use-indexeddb

export class DatabaseManager {

  static databases: {[databaseName: string]: Database }  = {}

  static async prepare(config:DatabaseSchema) {
    this.databases[config.databaseName] = new Database({config})
    await this.databases[config.databaseName].migrate()
  }

  static getDb(databaseName) {
    return this.databases[databaseName]
  }

}

