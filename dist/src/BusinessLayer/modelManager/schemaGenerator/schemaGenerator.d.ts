import { IRegister } from '../../beastOrm.type.js';
import { IDatabaseSchema } from '../../_interface/interface.js';
declare class SchemaGenerator {
    generate(entries: IRegister): IDatabaseSchema;
    private getModalName;
    private makePrimary;
    /**
     * Attaches generated table schema to model classes.
     * @param {DatabaseSchema} databaseSchema - The database schema to extract table information from.
     * @param {Object} entries - An object containing model classes.
     */
    attachGeneratedTableSchemaToModel(databaseSchema: IDatabaseSchema, entries: IRegister): void;
}
export declare const schemaGenerator: SchemaGenerator;
export {};
