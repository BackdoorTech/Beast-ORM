import { ITableSchema } from "../_interface/interface.type";
export declare class DataParameters {
    getFilteredData(tableSchema: ITableSchema, data: Object): {};
    getFilteredDataWithId(tableSchema: ITableSchema, data: Object): {};
    getFilteredDataOverlay(tableSchema: ITableSchema, data: Object): {};
}
export declare const dataParameters: DataParameters;
