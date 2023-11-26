import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js';
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { DBEventsTrigger } from './_interface/interface.type.js';
import { validator } from './validation/validator.js';
import { dataParameters } from "./modelManager/dataParameters.js";
import { RuntimeMethods as RM } from './modelManager/runtimeMethods/runTimeMethods.js';
import { queryBuilderInsertHandler } from "./queryBuilderHandler/queryBuilderInsertHandler.js";
import { queryBuilderDeleteHandler } from "./queryBuilderHandler/queryBuilderDeletehandler.js";
import { queryBuilderUpdateHandler } from "./queryBuilderHandler/queryBuilderUpdateHandler.js";
import { queryBuilderSelectHandler } from "./queryBuilderHandler/queryBuilderSelectHandler.js";
import { relationShip } from './modelManager/relationships/relationShip.js';
import { modelGeneration } from './modelManager/modelGenerator.js';
import { addRunTimeMethod } from './modelManager/runtimeMethods/addRuntimeMethod.js';
import { ReactiveList } from './reactiveList/reactiveList.js';
class BeastORM {
    constructor() {
        this.register = (register) => {
            addRunTimeMethod.addModelSchema(register);
            // generate schema
            const schema = schemaGenerator.generate(register);
            addRunTimeMethod.addGeneratedTableSchemaToModel(schema, register);
            const middleTablesModels = modelGeneration.forMiddleTables(schema, register);
            const methodToAdd = relationShip.generateRelationShipMethods(schema, register, middleTablesModels);
            addRunTimeMethod.attachRelationShipMethods(methodToAdd);
            const models = register.models.concat(middleTablesModels);
            modelRegistration.register(schema, models);
            const database = modelRegistration.getDatabase(schema.databaseName);
            const DatabaseStrategy = database
                .DBConnectionManager
                .driverAdapter
                .strategy;
            for (const model of register.models) {
                addRunTimeMethod.addStaticFunctionFWrap(model, RM.getModel, model);
                addRunTimeMethod.addFunctionFWrap(model, RM.getModel, model);
                const generateValidator = validator.ModelValidator(model, model[RM.getTableSchema]());
                addRunTimeMethod.addStaticFunctionFWrap(model, RM.validator, generateValidator);
            }
            DatabaseStrategy.prepare(schema)({
                onerror: () => { },
                onsuccess: () => { },
                done: () => { }
            });
            this.prepareMigrations(schema, DatabaseStrategy);
        };
    }
    async prepareMigrations(schema, DatabaseStrategy) {
        const makeMigrations = new MakeMigrations();
        // console.log("===================================5")
        await makeMigrations.make(schema);
        // console.log("===================================6")
        if (makeMigrations.needToMigrate) {
            // console.log("Migrate")
            // await migrateMigrations.prepareMigrate(schema, DatabaseStrategy)
            // await migrateMigrations.migrate(schema, DatabaseStrategy)
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
        const arrayOfDataBackup = [...QueryBuilder.query.values];
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
            return await queryBuilderInsertHandler.INSERTMany(DatabaseStrategy, QueryBuilder, arrayOfDataBackup);
        }
        else {
            return await queryBuilderInsertHandler.INSERTOne(DatabaseStrategy, QueryBuilder, arrayOfDataBackup);
        }
    }
    async executeInsertionManyQuery(QueryBuilder, Model) {
        const tableSchema = Model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        const arrayOfData = QueryBuilder.query.values;
        return await queryBuilderInsertHandler.INSERTMany(DatabaseStrategy, QueryBuilder, arrayOfData);
    }
    executeSelectQuery(QueryBuilder, Model) {
        const tableSchema = Model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        return {
            one: () => {
                return queryBuilderSelectHandler.SELECTOne(DatabaseStrategy, QueryBuilder);
            },
            many: () => {
                return queryBuilderSelectHandler.SELECTMany(DatabaseStrategy, QueryBuilder);
            },
            decide: () => {
                if (QueryBuilder.query.isParamsArray) {
                    return queryBuilderSelectHandler.SELECTMany(DatabaseStrategy, QueryBuilder);
                }
                return queryBuilderSelectHandler.SELECTOne(DatabaseStrategy, QueryBuilder);
            }
        };
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
        const tableSchema = model.getTableSchema();
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
    registerTrigger(_Model, callBack) {
        const tableSchema = _Model[RM.getTableSchema]();
        const databaseName = tableSchema.databaseName;
        const tableName = tableSchema.name;
        const database = modelRegistration.getDatabase(databaseName);
        const table = database.getTable(tableName);
        const triggerEventName = DBEventsTrigger.onCompleteReadTransaction;
        const hasSubscription = table.trigger.hasSubscription(triggerEventName);
        let subscriptionIdFromDataLayer;
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        const triggerRemove = () => {
            DatabaseStrategy.RemoveTrigger({ table: tableName, data: subscriptionIdFromDataLayer })({
                onsuccess: ({ subscriptionId }) => { },
                onerror: () => { },
                done: () => { }
            });
        };
        let returnObject = table.trigger.listeningToSubscription(triggerEventName, callBack, triggerRemove);
        if (!hasSubscription) {
            table.trigger.registerTrigger(triggerEventName);
            DatabaseStrategy.addTrigger({ table: tableName, data: "" })({
                onsuccess: ({ subscriptionId }) => {
                    subscriptionIdFromDataLayer = subscriptionId;
                    table.trigger.createShareSubscription(triggerEventName, subscriptionId);
                    table.trigger.associateDispatchUIDToTrigger(triggerEventName, returnObject.dispatchUID, subscriptionIdFromDataLayer);
                },
                stream: (data) => {
                    const subscriptionId = data.subscriptionId;
                    table.trigger.executeTriggers(triggerEventName, subscriptionId);
                },
                onerror: () => { },
                done: () => { }
            });
        }
        else {
            subscriptionIdFromDataLayer = table.trigger.findTriggerToShared(triggerEventName);
            table.trigger.associateDispatchUIDToTrigger(triggerEventName, returnObject.dispatchUID, subscriptionIdFromDataLayer);
        }
        return returnObject;
    }
    ReactiveList(_Model, callBack) {
        const reactiveList = new ReactiveList();
        return reactiveList.subscribe(_Model, callBack);
    }
}
export const ORM = new BeastORM();
