import { Model } from "../models/model.js";
export declare class triggers {
    static beforeInsert(Model: Model, callback: Function): {
        SubscriptionName: string;
        disconnect(): void;
    };
    static AfterInsert(Model: any, callback: Function): {
        dispatchUID: string;
        disconnect(): void;
    };
    static beforeDelete(Model: any, callback: Function): {
        dispatchUID: string;
        disconnect(): void;
    };
    static AfterDelete(Model: any, callback: Function): {
        dispatchUID: string;
        disconnect(): void;
    };
}
