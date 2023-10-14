import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator'
import { IRegister } from './beastOrm.type'
class BeastORM {

  private migrate() {}
  register(register:IRegister) {

    // generate schema
    const schema = schemaGenerator.generate(register)
    schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);


    // make migrations
    // detect migration change
    // migrate
    // roll back
  }

  executeQuery() {}
  executeQueries() {}
}

export const ORM = new BeastORM()
