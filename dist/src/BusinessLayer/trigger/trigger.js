import { uniqueGenerator } from "../../Utility/utils.js";
var DBEvents;
(function (DBEvents) {
    DBEvents[DBEvents["onCompleteReadTransaction"] = 1] = "onCompleteReadTransaction";
    DBEvents[DBEvents["onCompleteWrite"] = 2] = "onCompleteWrite";
})(DBEvents || (DBEvents = {}));
export class TriggerManager {
    constructor() {
        this.subscription = {};
        this.callbacks = {};
    }
    createShareSubscription(eventName, subscriptionIdFromDataLayer) {
        if (!this.subscription[eventName][subscriptionIdFromDataLayer]) {
            this.subscription[eventName][subscriptionIdFromDataLayer] = {};
        }
    }
    registerTrigger(eventName) {
        if (!this.subscription[eventName]) {
            this.subscription[eventName] = {};
        }
    }
    associateDispatchUIDToTrigger(eventName, dispatchUID, subscriptionIdFromDataLayer) {
        this.subscription[eventName][subscriptionIdFromDataLayer][dispatchUID] = true;
    }
    hasSubscription(eventName) {
        var _a, _b;
        return ((_b = Object.keys(((_a = this.subscription) === null || _a === void 0 ? void 0 : _a[eventName]) || {})) === null || _b === void 0 ? void 0 : _b.length) >= 1;
    }
    findTriggerToShared(eventName) {
        const firstSubscription = Object.keys(this.subscription[eventName])[0];
        return firstSubscription;
    }
    findDispatchUID(eventName, dispatchUID) {
        for (const [subscriptionIdFromDataLayer, value] of Object.entries(this.subscription[eventName])) {
            if (value[dispatchUID]) {
                return { subscriptionIdFromDataLayer, dispatchUID };
            }
        }
    }
    listeningToSubscription(eventName, callback, triggerRemove) {
        const id = uniqueGenerator();
        this.callbacks[id] = (callback);
        return {
            dispatchUID: id,
            disconnect: () => {
                var _a, _b, _c;
                const { subscriptionIdFromDataLayer } = this.findDispatchUID(eventName, id);
                delete this.subscription[eventName][subscriptionIdFromDataLayer][id];
                if (((_c = Object.keys(((_b = (_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a[eventName]) === null || _b === void 0 ? void 0 : _b[subscriptionIdFromDataLayer]) || {})) === null || _c === void 0 ? void 0 : _c.length) == 0) {
                    delete this.subscription[eventName][subscriptionIdFromDataLayer];
                    triggerRemove();
                    if (Object.keys(this.subscription[eventName] || {}).length == 0) {
                        delete this.subscription[eventName];
                    }
                }
            }
        };
    }
    executeTriggers(eventName, subscriptionIdFromDataLayer) {
        try {
            for (const trigger of Object.keys(this.subscription[eventName][subscriptionIdFromDataLayer])) {
                this.callbacks[trigger]();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
