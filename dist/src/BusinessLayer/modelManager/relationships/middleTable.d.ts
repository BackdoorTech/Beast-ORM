import { Model } from "../../../Presentation/Api.js";
import { ITableSchema } from "../../_interface/interface.type.js";
export declare class MiddleTable {
    addMiddleTable(foreignKeyFieldName: string, foreignKeyTableName: any, ArgCurrentModelName: string, databaseName: string): ITableSchema;
    generateGenericModel({ ModelName, middleTableSchema }: {
        ModelName: any;
        middleTableSchema: any;
    }): {
        new (): {
            getModel(): typeof Model;
            save(params?: any): Promise<boolean>;
            getPrimaryKeyValue(): string | number;
            setPrimaryKey(key: string | number): void;
            delete(): Promise<number | true>;
            get(): Promise<boolean>;
        };
        getTableSchema(): ITableSchema;
        getModel(): typeof Model;
        getModelSchema(): any;
        get(value: Object): Promise<any>;
        all<T>(): Promise<false | T[]>;
        deleteAll(): Promise<number | true>;
        create<T_1>(params: any): Promise<T_1>;
        filter<T_2>(value: Object): {
            execute: () => Promise<T_2>;
            update: (params: any) => Promise<number | true>;
            delete: () => Promise<number | true>;
        };
        magic(): Model<unknown>;
        transactionOnCommit(fn: Function): {
            dispatchUID: string;
            disconnect: () => void;
        };
        ReactiveList(callback: import("../../_interface/interface.type.js").ICallBackReactiveList): {
            readonly value: any;
            readonly subscribe: {
                dispatchUID: string;
                disconnect: () => void;
            };
            unsubscribe: () => Promise<void>;
            setUpdateUi(func: any): void;
        };
    };
}
export declare const middleTable: MiddleTable;
