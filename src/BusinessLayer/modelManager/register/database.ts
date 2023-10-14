import { Table } from './table.js'
import { DatabaseType } from './../../../Utility/globalInterface.js'
import { IConfig } from './database.type.js'
import { DBConnectionManager } from '../../../DataAccess/DBconnectionManager/DBConnectionManager.js'
import { DataAccess, dataAccess } from '../../../DataAccess/dataAccess.js'
export class Database {

  databaseName: string
  version: number
  type: DatabaseType = DatabaseType.IndexedDB
  tables: Table[] = []
  DBConnectionManager!: DBConnectionManager

  constructor(DatabaseSchema: IConfig) {
    this.databaseName = DatabaseSchema.databaseName
    this.version = DatabaseSchema.version

    for(const tableSchema of DatabaseSchema.table) {
      const table = new Table(tableSchema)
      this.tables.push(table)
    }

    this.establishConnection(DatabaseSchema)
  }

  private establishConnection(DatabaseSchema: IConfig) {
    this.DBConnectionManager = dataAccess.createDBconnectionManager(DatabaseSchema)
  }
}
