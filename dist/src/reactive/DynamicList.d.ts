import { Model } from "../models/model.js";
export declare class ReactiveList {
    static subscribe(Model: Model, callback: any): {
        readonly value: any[];
        readonly subscribe: any;
        unsubscribe: () => Promise<any>;
    };
}
