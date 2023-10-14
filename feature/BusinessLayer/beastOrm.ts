import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator'
import { IRegister } from './beastOrm.type'
import { modelRegistration } from './modelManager/register/register';
class BeastORM {

  private migrate() {}
  register(register:IRegister) {

    // generate schema
    const schema = schemaGenerator.generate(register)
    schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);
    modelRegistration.register(schema)

    // make migrations
    // detect migration change
    // migrate
    // roll back
  }

  executeQuery() {}
  executeQueries() {}
}

export const ORM = new BeastORM()
