import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js'
import { IRegister } from './beastOrm.type.js'
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
import { IDatabaseStrategy } from '../DataAccess/DriverAdapters/DriverAdapter.type.js';
import { IDatabaseSchema } from './_interface/interface.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js'
import { Model } from '../Presentation/Api';
import { queryBuilderHandler } from './queryBuilderHandler.js';
class BeastORM {

  register = (register:IRegister) => {

    // generate schema
    const schema = schemaGenerator.generate(register)
    schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);
    modelRegistration.register(schema)

    const database = modelRegistration.getDatabase(schema.databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy


    DatabaseStrategy.prepare(schema)({done: () => {}})

    this.prepareMigrations(schema, DatabaseStrategy)
  }

  private async prepareMigrations (schema: IDatabaseSchema, DatabaseStrategy: IDatabaseStrategy) {
    const makeMigrations = new MakeMigrations();
    await makeMigrations.make(schema)

    if(makeMigrations.needToMigrate) {
      // console.log("Migrate")
      await migrateMigrations.prepareMigrate(schema, DatabaseStrategy)
      await migrateMigrations.migrate(schema, DatabaseStrategy)
    } else {
      // console.log('no need to migrate')
    }
  }

  async executeQuery(QueryBuilder: QueryBuilder, Model:Model<any>) {
    const data = Model["getTableSchema"]()
    const databaseName = data.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

    await queryBuilderHandler[QueryBuilder.query.type](DatabaseStrategy, QueryBuilder)
  }
  executeQueries() {}
}

export const ORM = new BeastORM()
