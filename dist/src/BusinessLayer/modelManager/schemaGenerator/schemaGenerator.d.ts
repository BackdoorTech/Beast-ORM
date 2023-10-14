import { IRegister } from '../../beastOrm.type.js';
import { DatabaseSchema } from './schemaGenerator.type.js';
declare class SchemaGenerator {
    generate(entries: IRegister): DatabaseSchema;
    private getModalName;
    private makePrimary;
    /**
     * Attaches generated table schema to model classes.
     * @param {DatabaseSchema} databaseSchema - The database schema to extract table information from.
     * @param {Object} entries - An object containing model classes.
     */
    attachGeneratedTableSchemaToModel(databaseSchema: DatabaseSchema, entries: IRegister): void;
}
export declare const schemaGenerator: SchemaGenerator;
export {};
