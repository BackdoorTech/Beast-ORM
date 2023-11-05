
import { Model } from '../../../Presentation/Api.js'
import { IDatabaseSchema, ITableSchema } from '../../_interface/interface.js'
import { Database } from './database.js'

class ModelRegistration {
  databases: {[key: string]: Database} = {}

  register(DatabaseSchema: IDatabaseSchema) {
    const database = new Database(DatabaseSchema)
    const databaseName = DatabaseSchema.databaseName
    this.databases[databaseName] = database
  }

  getDatabase(databaseName) {
    return this.databases[databaseName]
  }
}


export const modelRegistration = new ModelRegistration()
