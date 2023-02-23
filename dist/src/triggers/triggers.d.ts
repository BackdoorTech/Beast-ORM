import { Model } from "../models/model.js";
interface Trigger {
    callback: Function;
}
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
export declare class triggerSignal {
    static beforeInsertExist(Model: any): Trigger[];
    static beforeInsert(instance: Model): Promise<void>;
    static AfterInsertExist(Model: any): Trigger[];
    static AfterInsert(instance: Model): Promise<void>;
    static AfterDeleteExist(Model: any): Trigger[];
    static AfterDelete(instance: Model | string, { modelName, databaseName }: any): Promise<void>;
    static BeforeDeleteExist(Model: any): Trigger[];
    static BeforeDelete(instance: Model | string, { modelName, databaseName }: {
        modelName: any;
        databaseName: any;
    }): Promise<void>;
}
export {};
