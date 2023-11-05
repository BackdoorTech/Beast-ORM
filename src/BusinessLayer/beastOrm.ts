import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js'
import { IRegister } from './beastOrm.type.js'
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
import { IDatabaseStrategy } from '../DataAccess/DriverAdapters/DriverAdapter.type.js';
import { IDatabaseSchema, ITableSchema } from './_interface/interface.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js'
import { queryBuilderHandler } from './queryBuilderHandler.js';
import { customMethod } from '../Configuration/CustomMethod.js';
import { Model, Model as ModelType } from '../Presentation/Api';
import { validator } from './validation/validator.js'
import { Either } from '../Utility/Either/index.js'
import { dataParameters } from "./modelManager/dataParameters.js"
import { RuntimeMethods as RM } from './modelManager/runtimeMethods/runTimeMethods.js';
import { EitherFormValidationError, FormValidationError } from './validation/fields/allFields.type.js';

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

    for(const model of register.models) {

      // const tableSchema = model[RM.getTableSchema]()

      this.addMethods(model, RM.getModel,  model)
      const generateValidator = validator.ModelValidator(model, model[RM.getTableSchema]())
      this.addStaticMethodNowrap(model, RM.validator,  generateValidator)

    }

  }

  addMethods(Model:typeof ModelType<any>, functionName , value) {

    customMethod.add(Model, functionName, value)

  }

  addStaticMethodNowrap(Model:typeof ModelType<any>, functionName , value:Function) {

    customMethod.addStaticMethodNowrap(Model, functionName, value)

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

  async executeInsertionQuery<PModel>(QueryBuilder: QueryBuilder, Model:PModel):Promise<Either<PModel, FormValidationError>>   {
    const tableSchema: ITableSchema = Model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

      const arrayOfData = QueryBuilder.query.values

      const validator: (value: Object) => EitherFormValidationError  = Model[RM.validator]

      for( const object in arrayOfData) {
        arrayOfData[object] = dataParameters.getFilteredData(tableSchema, arrayOfData[object])
        const validationResult = validator(arrayOfData[object])

        if(validationResult.isError) {
          return validationResult as any
        }

      }
      QueryBuilder.setCleanData(arrayOfData)

    return await queryBuilderHandler[QueryBuilder.query.type](DatabaseStrategy, QueryBuilder)
  }

  async executeSelectQuery<PModel>(QueryBuilder: QueryBuilder, Model:PModel):Promise<Either<PModel, FormValidationError>>   {
    const tableSchema: ITableSchema = Model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

    return await queryBuilderHandler[QueryBuilder.query.type](DatabaseStrategy, QueryBuilder)
  }


  async executeUpdateQuery<PModel>(QueryBuilder: QueryBuilder, Model:PModel):Promise<Either<PModel, FormValidationError>>   {
    const tableSchema: ITableSchema = Model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

    return await queryBuilderHandler[QueryBuilder.query.type](DatabaseStrategy, QueryBuilder)
  }


  async deleteQuery<PModel>(QueryBuilder: QueryBuilder, Model:PModel):Promise<Either<PModel, FormValidationError>> {
    const tableSchema: ITableSchema = Model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

      const arrayOfData = QueryBuilder.query.values

      for( const object in arrayOfData) {
        arrayOfData[object] = dataParameters.getFilteredDataOverlay(tableSchema, arrayOfData[object])
      }
      QueryBuilder.setCleanData(arrayOfData)

    return await queryBuilderHandler[QueryBuilder.query.type](DatabaseStrategy, QueryBuilder)
  }

  async deleteQueryNoFormValidation(QueryBuilder: QueryBuilder, model: typeof Model):Promise<Either<true, FormValidationError>> {
    const tableSchema: ITableSchema = model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

    return await queryBuilderHandler[QueryBuilder.query.type](DatabaseStrategy, QueryBuilder)
  }

  executeQueries() {}
}

export const ORM = new BeastORM()
