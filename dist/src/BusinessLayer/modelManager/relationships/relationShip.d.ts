import { Model } from "../../../Presentation/Api";
export declare class RelationShip {
    getMiddleTable(modelWithNoGetter: typeof Model<any>, modelWithGetter: typeof Model<any>): {
        new (): Model<any>;
        getTableSchema(): import("../../_interface/interface.type").ITableSchema;
        getModel(): typeof Model;
        getModelSchema(): any;
        get(value: Object): Promise<any>;
        all<T>(): Promise<T[]>;
        deleteAll(): Promise<number | true>;
        create<T_1>(params: any): Promise<T_1>;
        filter<T_2>(value: Object): {
            execute: () => Promise<T_2>;
            update: (params: any) => Promise<number | true>;
            delete: () => Promise<number | true>;
        };
        magic(): Model<unknown>;
    };
    getMiddleTableName(modelWithNoGetter: typeof Model<any>, modelWithGetter: typeof Model<any>): string;
    addToMiddleTable<T>(currentModel: Model<any>, otherModel: typeof Model<any>, toAdd: Model<any>, middleTableModel: typeof Model<any>): Promise<T>;
    getAll<T>(currentModel: Model<any>, otherModel: typeof Model<any>, middleTableModel: typeof Model<any>): Promise<any[]>;
}
export declare const relationShip: RelationShip;
