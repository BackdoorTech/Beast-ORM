
import {} from '../schemaGenerator/ModelReader'
import { Database } from './database'
import { DatabaseSchema } from '../../modelManager/schemaGenerator/schemaGenerator.type'

class ModelRegistration {
  databases: {[key: string]: Database} = {}

  register(DatabaseSchema: DatabaseSchema) {

    const database = new Database(DatabaseSchema)
    const databaseName = DatabaseSchema.databaseName
    this.databases[databaseName] = database
  }
}


export const modelRegistration = new ModelRegistration()
