import { Model as ModelType } from "../models/model.js";
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
    static prepare(model: typeof ModelType): void;
    static subscribe(model: typeof ModelType, callback: any): {
        queryId: string;
        subscribe: boolean;
        unsubscribe: () => Promise<unknown>;
    };
}
