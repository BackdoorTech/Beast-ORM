
import {} from '../schemaGenerator/ModelReader'
import { Database } from './database.js'

export class ModelRegistration {
  databases: {[key: string]: Database} = {}

  static register() {}
}
