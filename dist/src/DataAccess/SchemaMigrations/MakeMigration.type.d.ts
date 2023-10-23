import { ITableSchema } from "../_interface/interface";
export interface IMigrations {
    databaseName: string;
    type: 'indexedDB' | 'localStorage';
    version: number;
    webWorker?: boolean;
    table: ITableSchema[];
}
