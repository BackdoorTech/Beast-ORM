import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js'
import { IRegister } from './beastOrm.type.js'
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
class BeastORM {

  private migrate() {}
  register(register:IRegister) {

    // generate schema
    const schema = schemaGenerator.generate(register)
    schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);
    modelRegistration.register(schema)

    const database = modelRegistration.getDatabase(schema.databaseName)

    const strategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

    const makeMigrations = new MakeMigrations();
    makeMigrations.make(schema, strategy)

    if(makeMigrations.needToMigrate) {
      migrateMigrations.migrate(schema, strategy)
    }
  }

  executeQuery() {}
  executeQueries() {}
}

export const ORM = new BeastORM()
