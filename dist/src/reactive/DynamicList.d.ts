import { Model } from "../models/model.js";
export declare class ReactiveList {
    static subscribe(model: typeof Model, callback: any): {
        readonly value: any;
        readonly subscribe: any;
        unsubscribe: () => Promise<any>;
        setUpdateUi(func: any): void;
    };
}
