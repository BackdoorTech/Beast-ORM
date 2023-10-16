import { schemaGenerator } from './modelManager/schemaGenerator/schemaGenerator.js';
import { modelRegistration } from './modelManager/register/register.js';
import { MakeMigrations } from '../DataAccess/SchemaMigrations/MakeMigration.js';
class BeastORM {
    migrate() { }
    register(register) {
        // generate schema
        const schema = schemaGenerator.generate(register);
        schemaGenerator.attachGeneratedTableSchemaToModel(schema, register);
        modelRegistration.register(schema);
        const database = modelRegistration.getDatabase(schema.databaseName);
        const strategy = database
            .DBConnectionManager
            .driverAdapter
            .strategy;
        this.prepareMigrations(schema, strategy);
    }
    async prepareMigrations(schema, Function) {
        const makeMigrations = new MakeMigrations();
        await makeMigrations.make(schema);
        if (makeMigrations.needToMigrate) {
            console.log("Migrate");
            // migrateMigrations.migrate(schema, {})
        }
        else {
            console.log('no need to migrate');
        }
    }
    executeQuery() { }
    executeQueries() { }
}
export const ORM = new BeastORM();
