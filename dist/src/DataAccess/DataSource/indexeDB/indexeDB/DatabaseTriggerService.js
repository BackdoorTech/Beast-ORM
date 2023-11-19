import { uniqueGenerator } from "../../../../Utility/utils.js";
export class DatabaseTriggerService {
    constructor() {
        this.preCreate = {};
        this.postCreate = {};
        this.onCompleteReadTransaction = {};
    }
    subscribe(eventName, ModelName, callback) {
        if (!this[eventName]) {
            this[eventName] = {};
        }
        if (!this[eventName][ModelName]) {
            this[eventName][ModelName] = [];
        }
        const subscriptionId = uniqueGenerator();
        this[eventName][ModelName][subscriptionId] = Object.assign({}, callback);
        callback.onsuccess({ subscriptionId });
    }
    unsubscribe(eventName, ModelName, subscriptionId, callback) {
        delete this[eventName][ModelName][subscriptionId];
    }
    executeTriggers(eventName, ModelName) {
        if (this[eventName][ModelName]) {
            for (const [subscriptionId, value] of Object.entries(this[eventName][ModelName] || {})) {
                value.stream({ subscriptionId });
            }
        }
    }
}
