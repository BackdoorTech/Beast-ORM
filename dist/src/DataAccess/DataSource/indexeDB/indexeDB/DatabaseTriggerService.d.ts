import { IReturnTriggerObject } from "../../../DriverAdapters/DriverAdapter.type";
interface Trigger {
    callback: Function;
}
export declare class DatabaseTriggerService {
    preCreate: {
        [eventName: string]: {
            [tableName: string]: {
                [key: string]: Trigger[];
            };
        };
    };
    postCreate: {
        [eventName: string]: {
            [tableName: string]: {
                [key: string]: Trigger[];
            };
        };
    };
    onCompleteReadTransaction: {
        [eventName: string]: {
            [tableName: string]: {
                [key: string]: Trigger[];
            };
        };
    };
    subscribe(eventName: string, ModelName: string, callback: IReturnTriggerObject): void;
    unsubscribe(eventName: string, ModelName: string, subscriptionId: any, callback: IReturnTriggerObject): void;
    executeTriggers(eventName: string, ModelName: string): void;
}
export {};
