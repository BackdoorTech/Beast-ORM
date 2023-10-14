
import {} from '../schemaGenerator/ModelReader.js'
import { Database } from './database.js'
import { DatabaseSchema } from '../../modelManager/schemaGenerator/schemaGenerator.type.js'

class ModelRegistration {
  databases: {[key: string]: Database} = {}

  register(DatabaseSchema: DatabaseSchema) {

    const database = new Database(DatabaseSchema)
    const databaseName = DatabaseSchema.databaseName
    this.databases[databaseName] = database
  }

  getDatabase(databaseName) {
    return this.databases[databaseName]
  }
}


export const modelRegistration = new ModelRegistration()
