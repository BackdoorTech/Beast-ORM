import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js'
import { IRegister } from './beastOrm.type.js'
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
import { IDatabaseStrategy } from '../DataAccess/DriverAdapters/DriverAdapter.type.js';
import { DatabaseSchema } from './modelManager/schemaGenerator/schemaGenerator.type.js';
class BeastORM {


  register(register:IRegister) {

    // generate schema
    const schema = schemaGenerator.generate(register)
    schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);
    modelRegistration.register(schema)

    const database = modelRegistration.getDatabase(schema.databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

    this.prepareMigrations(schema, DatabaseStrategy)
  }

  private async prepareMigrations (schema: DatabaseSchema, DatabaseStrategy: IDatabaseStrategy) {
    const makeMigrations = new MakeMigrations();
    await makeMigrations.make(schema)

    if(makeMigrations.needToMigrate) {
      console.log("Migrate")
      await migrateMigrations.prepareMigrate(schema, DatabaseStrategy)
      await migrateMigrations.migrate(schema, DatabaseStrategy)
    } else {
      console.log('no need to migrate')
    }
  }

  executeQuery() {}
  executeQueries() {}
}

export const ORM = new BeastORM()
