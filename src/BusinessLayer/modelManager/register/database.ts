import { Table } from './table.js'
import { DatabaseType } from './../../../Utility/globalInterface.js'
import { DBConnectionManager } from '../../../DataAccess/DBconnectionManager/DBConnectionManager.js'
import { DataAccess, dataAccess } from '../../../DataAccess/dataAccess.js'
import { IDatabaseSchema } from '../../_interface/interface.type.js'
import { Model } from '../../../Presentation/Api.js'
import { TriggerManager } from '../../trigger/trigger.js'
export class Database {

  databaseName: string
  version: number
  type: DatabaseType = DatabaseType.IndexedDB

  tables: {[key: string]: Table} = {}

  DBConnectionManager!: DBConnectionManager

  constructor(DatabaseSchema: IDatabaseSchema, Models: typeof Model<any>[]) {
    this.databaseName = DatabaseSchema.databaseName
    this.version = DatabaseSchema.version

    const tables = DatabaseSchema.table.concat(DatabaseSchema.middleTables)

    for(const tableSchema of tables) {
      const model = Models.find( (e) => e.getTableSchema().name == tableSchema.name)
      const table = new Table(tableSchema, model)
      this.tables[tableSchema.name]= table
    }

    this.establishConnection(DatabaseSchema)
  }


  getTable(tableName) {
    return this.tables[tableName]
  }

  private establishConnection(DatabaseSchema: IDatabaseSchema) {
    this.DBConnectionManager = dataAccess.createDBconnectionManager(DatabaseSchema)
  }
}
