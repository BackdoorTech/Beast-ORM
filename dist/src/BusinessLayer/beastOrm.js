import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js';
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
import { queryBuilderHandler } from './queryBuilderHandler.js';
import { customMethod } from '../Configuration/CustomMethod.js';
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
        };
    }
    addMethods(Model) {
        const schema = Model.getTableSchema();
        const object = {};
        for (const fieldName of schema.fieldNames) {
            object[fieldName] = null;
        }
        delete object[schema.id.keyPath];
        customMethod.addStaticMethod(Model, 'emptyFields', function () {
            return object;
        });
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
    async executeQuery(QueryBuilder, Model) {
        const data = Model["getTableSchema"]();
        const databaseName = data.databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        return await queryBuilderHandler[QueryBuilder.query.type](DatabaseStrategy, QueryBuilder);
    }
    executeQueries() { }
}
export const ORM = new BeastORM();
