import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js';
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
import { migrateMigrations } from '../DataAccess/SchemaMigrations/MigrateMigrations.js';
class BeastORM {
    register(register) {
        // generate schema
        const schema = schemaGenerator.generate(register);
        schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);
        modelRegistration.register(schema);
        const database = modelRegistration.getDatabase(schema.databaseName);
        const DatabaseStrategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        this.prepareMigrations(schema, DatabaseStrategy);
    }
    async prepareMigrations(schema, DatabaseStrategy) {
        const makeMigrations = new MakeMigrations();
        await makeMigrations.make(schema);
        if (makeMigrations.needToMigrate) {
            console.log("Migrate");
            await migrateMigrations.prepareMigrate(schema, DatabaseStrategy);
            await migrateMigrations.migrate(schema, DatabaseStrategy);
        }
        else {
            console.log('no need to migrate');
        }
    }
    executeQuery() { }
    executeQueries() { }
}
export const ORM = new BeastORM();
