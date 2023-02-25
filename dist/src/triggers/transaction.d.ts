import { Model } from "../models/model.js";
export declare class transactionOnCommit {
    static stores: {
        [dbName: string]: {
            [store: string]: {
                [requestId: string]: Function;
            };
        };
    };
    static subscription: {
        [SubscriptionName: string]: boolean;
    };
    static prepare(Model: Model): void;
    static subscribe(Model: Model, callback: any): {
        subscribe: boolean;
        unsubscribe: () => Promise<unknown>;
    };
}
