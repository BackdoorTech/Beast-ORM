import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js';
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
import { customMethod } from '../Configuration/CustomMethod.js';
import { validator } from './validation/validator.js';
import { dataParameters } from "./modelManager/dataParameters.js";
import { RuntimeMethods as RM } from './modelManager/runtimeMethods/runTimeMethods.js';
import { queryBuilderInsertHandler } from "./queryBuilderHandler/queryBuilderInsertHandler.js";
import { queryBuilderDeleteHandler } from "./queryBuilderHandler/queryBuilderDeletehandler.js";
import { queryBuilderUpdateHandler } from "./queryBuilderHandler/queryBuilderUpdateHandler.js";
import { queryBuilderSelectHandler } from "./queryBuilderHandler/queryBuilderSelectHandler.js";
class BeastORM {
    constructor() {
        this.register = (register) => {
            // generate schema
            const schema = schemaGenerator.generate(register);
            schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);
            modelRegistration.register(schema);
            const database = modelRegistration.getDatabase(schema.databaseName);
            const DatabaseStrategy = database
                .DBConnectionManager
                .driverAdapter
                .strategy;
            DatabaseStrategy.prepare(schema)({ done: () => { } });
            this.prepareMigrations(schema, DatabaseStrategy);
            for (const model of register.models) {
                // const tableSchema = model[RM.getTableSchema]()
                this.addMethods(model, RM.getModel, model);
                const generateValidator = validator.ModelValidator(model, model[RM.getTableSchema]());
                this.addStaticMethodNowrap(model, RM.validator, generateValidator);
            }
        };
    }
    addMethods(Model, functionName, value) {
        customMethod.add(Model, functionName, value);
    }
    addStaticMethodNowrap(Model, functionName, value) {
        customMethod.addStaticMethodNowrap(Model, functionName, value);
    }
    async prepareMigrations(schema, DatabaseStrategy) {
        const makeMigrations = new MakeMigrations();
        await makeMigrations.make(schema);
        if (makeMigrations.needToMigrate) {
            // console.log("Migrate")
            await migrateMigrations.prepareMigrate(schema, DatabaseStrategy);
            await migrateMigrations.migrate(schema, DatabaseStrategy);
        }
        else {
            // console.log('no need to migrate')
        }
    }
    async executeInsertionQuery(QueryBuilder, Model) {
        const tableSchema = Model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        const arrayOfData = QueryBuilder.query.values;
        const validator = Model[RM.validator];
        for (const object in arrayOfData) {
            arrayOfData[object] = dataParameters.getFilteredData(tableSchema, arrayOfData[object]);
            const validationResult = validator(arrayOfData[object]);
            if (validationResult.isError) {
                return validationResult;
            }
        }
        QueryBuilder.setCleanData(arrayOfData);
        if (QueryBuilder.query.isParamsArray) {
            return await queryBuilderInsertHandler.INSERTMany(DatabaseStrategy, QueryBuilder);
        }
        else {
            return await queryBuilderInsertHandler.INSERTOne(DatabaseStrategy, QueryBuilder);
        }
    }
    async executeSelectQuery(QueryBuilder, Model) {
        const tableSchema = Model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        if (QueryBuilder.query.isParamsArray) {
            return await queryBuilderSelectHandler.SELECTMany(DatabaseStrategy, QueryBuilder);
        }
        else {
            return await queryBuilderSelectHandler.SELECTOne(DatabaseStrategy, QueryBuilder);
        }
    }
    async executeUpdateQuery(QueryBuilder, Model) {
        const tableSchema = Model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        if (QueryBuilder.query.isParamsArray) {
            return await queryBuilderUpdateHandler.UPDATEMany(DatabaseStrategy, QueryBuilder);
        }
        else {
            return await queryBuilderUpdateHandler.UPDATEOne(DatabaseStrategy, QueryBuilder);
        }
    }
    async deleteQuery(QueryBuilder, Model) {
        const tableSchema = Model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        const arrayOfData = QueryBuilder.query.values;
        for (const object in arrayOfData) {
            arrayOfData[object] = dataParameters.getFilteredDataOverlay(tableSchema, arrayOfData[object]);
        }
        QueryBuilder.setCleanData(arrayOfData);
        if (QueryBuilder.query.isParamsArray) {
            return await queryBuilderDeleteHandler.DELETEMany(DatabaseStrategy, QueryBuilder);
        }
        else {
            return await queryBuilderDeleteHandler.DELETEOne(DatabaseStrategy, QueryBuilder);
        }
    }
    async deleteQueryNoFormValidation(QueryBuilder, model) {
        const tableSchema = model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        if (QueryBuilder.query.isParamsArray) {
            return await queryBuilderDeleteHandler.DELETEMany(DatabaseStrategy, QueryBuilder);
        }
        else {
            return await queryBuilderDeleteHandler.DELETEOne(DatabaseStrategy, QueryBuilder);
        }
    }
    executeQueries() { }
}
export const ORM = new BeastORM();
