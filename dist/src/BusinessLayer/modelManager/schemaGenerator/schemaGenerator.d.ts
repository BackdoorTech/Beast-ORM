import { IRegister } from '../../beastOrm.type.js';
import { IDatabaseSchema } from '../../_interface/interface.type.js';
declare class SchemaGenerator {
    databases: {
        [key: string]: {
            tablesNames: string[];
            tableHash: {};
        };
    };
    processingDatabase(DBname: string): void;
    hasBeenProcessedDb(DBname: string): boolean;
    generate(entries: IRegister): IDatabaseSchema;
    private generateTableSchema;
    private getModalName;
    private getModelName;
    private registerModelName;
    private isModelNameAvailable;
    private hasRegisterModelName;
    private makePrimary;
}
export declare const schemaGenerator: SchemaGenerator;
export {};
