import { IRegister } from '../../beastOrm.type.js';
import { IDatabaseSchema } from '../../_interface/interface.type.js';
import { Model } from '../../../Presentation/Api.js';
declare class SchemaGenerator {
    databases: {
        [key: string]: {
            tablesNames: [];
        };
    };
    processingDatabase(DBname: string): void;
    hasBeenProcessedDb(DBname: string): boolean;
    generate(entries: IRegister): IDatabaseSchema;
    private generateTableSchema;
    private getModalName;
    private makePrimary;
    /**
     * Attaches generated table schema to model classes.
     * @param {DatabaseSchema} databaseSchema - The database schema to extract table information from.
     * @param {Object} entries - An object containing model classes.
     */
    attachGeneratedTableSchemaToModel(databaseSchema: IDatabaseSchema, entries: IRegister): void;
    attachMiddleTablesModel(databaseSchema: IDatabaseSchema, entries: IRegister, _MiddleModels: typeof Model<any>[]): void;
}
export declare const schemaGenerator: SchemaGenerator;
export {};
