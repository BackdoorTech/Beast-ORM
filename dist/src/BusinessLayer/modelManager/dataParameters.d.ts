import { ITableSchema } from "../_interface/interface.type";
export declare class DataParameters {
    getFilteredData(tableSchema: ITableSchema, data: Object): {};
    getUniqueData(tableSchema: ITableSchema, data: Object): {};
    hasField(data: Object): boolean;
    getFilteredDataWithId(tableSchema: ITableSchema, data: Object): {};
    getFilteredDataOverlay(tableSchema: ITableSchema, data: Object): {};
    setDataToInstance(): void;
}
export declare const dataParameters: DataParameters;
