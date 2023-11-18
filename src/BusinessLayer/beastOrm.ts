import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js'
import { IRegister } from './beastOrm.type.js'
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
import { IDatabaseStrategy } from '../DataAccess/DriverAdapters/DriverAdapter.type.js';
import { IDatabaseSchema, ITableSchema } from './_interface/interface.type.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js'
import { customMethod } from '../Configuration/CustomMethod.js';
import { Model, Model as ModelType } from '../Presentation/Api';
import { validator } from './validation/validator.js'
import { Either } from '../Utility/Either/index.js'
import { dataParameters } from "./modelManager/dataParameters.js"
import { RuntimeMethods as RM } from './modelManager/runtimeMethods/runTimeMethods.js';
import { EitherFormValidationError, FormValidationError } from './validation/fields/allFields.type.js';
import { queryBuilderInsertHandler } from "./queryBuilderHandler/queryBuilderInsertHandler.js"
import { queryBuilderDeleteHandler } from "./queryBuilderHandler/queryBuilderDeletehandler.js"
import { queryBuilderUpdateHandler } from "./queryBuilderHandler/queryBuilderUpdateHandler.js"
import { queryBuilderSelectHandler } from "./queryBuilderHandler/queryBuilderSelectHandler.js"
import { relationShip } from './modelManager/relationships/relationShip.js';
import { modelGeneration } from './modelManager/modelGenerator.js';
import { addRunTimeMethod } from './modelManager/runtimeMethods/addRuntimeMethod.js';


class BeastORM {

  register = (register:IRegister) => {

    // generate schema
    const schema = schemaGenerator.generate(register)


    schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);

    const middleTablesModels = modelGeneration.forMiddleTables(schema, register)

    schemaGenerator.attachMiddleTablesModel(schema, register, middleTablesModels);

    const models = register.models.concat(middleTablesModels)
    modelRegistration.register(schema, models)

    const database = modelRegistration.getDatabase(schema.databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy


    const modelsHolder: {[key:string]: typeof Model<any>} = {}

    let a: {
      fieldName: string,
      model: typeof Model<any>
    }[] = []

    let count = 0
    for( const tableSchema of schema.table) {
      if(tableSchema.attributes.foreignKey) {
        for(const fieldName of tableSchema.attributes.foreignKey) {
          register.models[count]
          modelsHolder[fieldName] = register.models[count]

          a.push({
            fieldName: fieldName,
            model: register.models[count]
          })
        }
      }

      count++
    }

    for(const model of register.models) {

      // const tableSchema = model[RM.getTableSchema]()

      this.addMethods(model, RM.getModel,  model)
      const generateValidator = validator.ModelValidator(model, model[RM.getTableSchema]())
      this.addStaticMethodNowrap(model, RM.validator,  generateValidator)

    }

    // console.log({schema})
    DatabaseStrategy.prepare(schema)({done: () => {}})
    this.prepareMigrations(schema, DatabaseStrategy)
  }

  addMethods(Model:typeof ModelType<any>, functionName , value) {

    customMethod.add(Model, functionName, value)

  }

  addStaticMethodNowrap(Model:typeof ModelType<any>, functionName , value:Function) {

    customMethod.addStaticMethodNowrap(Model, functionName, value)

  }

  private async prepareMigrations (schema: IDatabaseSchema, DatabaseStrategy: IDatabaseStrategy) {
    const makeMigrations = new MakeMigrations();
    // console.log("===================================5")
    await makeMigrations.make(schema)
    // console.log("===================================6")

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
      const arrayOfDataBackup = [...QueryBuilder.query.values]


      const validator: (value: Object) => EitherFormValidationError  = Model[RM.validator]

      for( const object in arrayOfData) {

        arrayOfData[object] = dataParameters.getFilteredData(tableSchema, arrayOfData[object])

        const validationResult = validator(arrayOfData[object])

        if(validationResult.isError) {
          return validationResult as any
        }

      }
    QueryBuilder.setCleanData(arrayOfData)

    if(QueryBuilder.query.isParamsArray) {
      return await queryBuilderInsertHandler.INSERTMany(DatabaseStrategy, QueryBuilder, arrayOfDataBackup)
    } else {
      return await  queryBuilderInsertHandler.INSERTOne(DatabaseStrategy, QueryBuilder, arrayOfDataBackup)

    }
  }

  async executeSelectQuery<PModel>(QueryBuilder: QueryBuilder, Model:PModel):Promise<Either<PModel, FormValidationError>>   {
    const tableSchema: ITableSchema = Model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

    if(QueryBuilder.query.isParamsArray) {
      return await queryBuilderSelectHandler.SELECTMany(DatabaseStrategy, QueryBuilder)
    } else {
      return await queryBuilderSelectHandler.SELECTOne(DatabaseStrategy, QueryBuilder)
    }
  }


  async executeUpdateQuery<PModel>(QueryBuilder: QueryBuilder, Model:PModel):Promise<Either<true  | number, FormValidationError>>   {
    const tableSchema: ITableSchema = Model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy
      if(QueryBuilder.query.isParamsArray) {
        return await queryBuilderUpdateHandler.UPDATEMany(DatabaseStrategy, QueryBuilder)
      } else {
        return await queryBuilderUpdateHandler.UPDATEOne(DatabaseStrategy, QueryBuilder)
      }
  }


  async deleteQuery<PModel>(QueryBuilder: QueryBuilder, Model:PModel):Promise<Either<true  | number, FormValidationError>> {
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

      if(QueryBuilder.query.isParamsArray) {
        return await queryBuilderDeleteHandler.DELETEMany(DatabaseStrategy, QueryBuilder)
      } else {
        return await queryBuilderDeleteHandler.DELETEOne(DatabaseStrategy, QueryBuilder)
      }
  }

  async deleteQueryNoFormValidation(QueryBuilder: QueryBuilder, model: typeof Model):Promise<Either<true  | number, FormValidationError>> {
    const tableSchema: ITableSchema = model[RM.getTableSchema]()
    const databaseName = tableSchema.databaseName

    const database = modelRegistration.getDatabase(databaseName)

    const DatabaseStrategy = database
      .DBConnectionManager
      .driverAdapter
      .strategy

      if(QueryBuilder.query.isParamsArray) {
        return await queryBuilderDeleteHandler.DELETEMany(DatabaseStrategy, QueryBuilder)
      } else {
        return await queryBuilderDeleteHandler.DELETEOne(DatabaseStrategy, QueryBuilder)
      }
  }
}

export const ORM = new BeastORM()
