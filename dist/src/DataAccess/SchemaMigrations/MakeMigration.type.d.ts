import { TableSchema } from "../../BusinessLayer/modelManager/schemaGenerator/schemaGenerator.type.js";
export interface IMigrations {
    databaseName: string;
    type: 'indexedDB' | 'localStorage';
    version: number;
    webWorker?: boolean;
    table: TableSchema[];
}
