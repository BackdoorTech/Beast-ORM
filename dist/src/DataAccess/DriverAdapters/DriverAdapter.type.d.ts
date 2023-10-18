import { TableSchema } from "../../BusinessLayer/modelManager/schemaGenerator/schemaGenerator.type.js";
export declare class IDatabaseStrategy {
    migrate(migrate: IMigrations): Promise<void>;
    insert(table: any, data: any): Promise<void>;
    select(table: any, key: any): Promise<void>;
    prepare(migrate: IMigrations): Promise<any>;
}
export interface IMigrations {
    databaseName: string;
    type: 'indexedDB' | 'localStorage';
    version: number;
    webWorker?: boolean;
    table: TableSchema[];
}
