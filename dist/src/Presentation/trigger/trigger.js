import { uniqueGenerator } from "../../Utility/utils.js";
var DBEvents;
(function (DBEvents) {
    DBEvents[DBEvents["onCompleteReadTransaction"] = 1] = "onCompleteReadTransaction";
    DBEvents[DBEvents["onCompleteWrite"] = 2] = "onCompleteWrite";
})(DBEvents || (DBEvents = {}));
class TriggerManager {
    constructor() {
        this.preCreate = {};
        this.postCreate = {};
    }
    registerTrigger(eventName, model) {
        const ModelName = model.getTableSchema().name;
        const databaseName = model.getTableSchema().databaseName;
        if (!this[eventName][databaseName]) {
            this[eventName][databaseName] = {};
        }
        if (!this[eventName][databaseName][ModelName]) {
            this[eventName][databaseName][ModelName] = {};
        }
    }
    hasSubscription(eventName, model) {
        const ModelName = model.getTableSchema().name;
        const databaseName = model.getTableSchema().databaseName;
        return Object.keys(this[eventName][databaseName][ModelName]).length >= 0;
    }
    subscribe(eventName, model, callback) {
        const id = uniqueGenerator();
        const ModelName = model.getTableSchema().name;
        const databaseName = model.getTableSchema().databaseName;
        const SubscriptionName = eventName + databaseName + ModelName;
        this[eventName][databaseName][ModelName].push({ callback });
        return {
            dispatchUID: id,
            disconnect: () => {
                delete this[eventName][databaseName][ModelName];
                if (!this.hasSubscription(eventName, model)) {
                }
                else {
                }
            }
        };
    }
    executeTriggers(eventName, model, data) {
        const ModelName = model.getTableSchema().name;
        const databaseName = model.getTableSchema().databaseName;
        if (this[eventName][databaseName][ModelName]) {
            for (const trigger of this[eventName][databaseName][ModelName](eventName)) {
                trigger.callback(data);
            }
        }
    }
}
