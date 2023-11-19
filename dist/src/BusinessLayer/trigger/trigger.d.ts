export interface IListeningToSubscriptionReturn {
    dispatchUID: number;
    disconnect: () => void;
}
export declare class TriggerManager {
    subscription: {
        [eventName: string]: {
            [subscriptionId: string]: {
                [dispatchUID: string]: boolean;
            };
        };
    };
    callbacks: {
        [key: string]: Function;
    };
    constructor();
    createShareSubscription(eventName: any, subscriptionIdFromDataLayer: any): void;
    registerTrigger(eventName: any): void;
    associateDispatchUIDToTrigger(eventName: any, dispatchUID: any, subscriptionIdFromDataLayer: any): void;
    hasSubscription(eventName: any): boolean;
    findTriggerToShared(eventName: any): string;
    findDispatchUID(eventName: any, dispatchUID: any): {
        subscriptionIdFromDataLayer: string;
        dispatchUID: any;
    };
    listeningToSubscription(eventName: any, callback: Function, triggerRemove: Function): {
        dispatchUID: string;
        disconnect: () => void;
    };
    executeTriggers(eventName: any, subscriptionIdFromDataLayer: any): void;
}
