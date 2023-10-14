import { SchemaGenerator } from './modelManager/schemaGenerator/schemaGenerator'
import { register } from './beastOrm.type'
class BeastORM {

  private generateSchema(register:register) {}
  private migrate() {}
  register(register:register) {
    // generate schema
    // attacheGeneratedTableSchemaToModel
    // make migrations
    // detect migration change
    // migrate
    // roll back
  }

  executeQuery() {}
  executeQueries() {}
}

export const ORM = new BeastORM()
