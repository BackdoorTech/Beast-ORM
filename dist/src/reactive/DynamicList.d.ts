import { Model as ModelType } from "../models/model.js";
export declare class ReactiveList {
    static subscribe(model: typeof ModelType, callback: any): {
        readonly value: any;
        readonly subscribe: any;
        unsubscribe: () => Promise<any>;
        setUpdateUi(func: any): void;
    };
}
