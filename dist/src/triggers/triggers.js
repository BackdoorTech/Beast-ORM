import { ModelManager } from "../models/model-manager.js";
import { hashCode, uniqueGenerator } from "../utils.js";
let triggerBeforeInsert = {};
let triggerAfterInsert = {};
let triggerBeforeDelete = {};
let triggerAfterDelete = {};
function createModelAttributeBefore(Model, triggerType) {
    const ModelName = Model.getModelName();
    const databaseName = Model.getDBSchema().databaseName;
    if (!triggerBeforeInsert[databaseName]) {
        triggerBeforeInsert[databaseName] = {};
    }
    if (!triggerBeforeInsert[databaseName][ModelName]) {
        triggerBeforeInsert[databaseName][ModelName] = [];
    }
    return { ModelName, databaseName };
}
function createModelAttributeAfter(Model, triggerType) {
    const ModelName = Model.getModelName();
    const databaseName = Model.getDBSchema().databaseName;
    if (!triggerAfterInsert[databaseName]) {
        triggerAfterInsert[databaseName] = {};
    }
    if (!triggerAfterInsert[databaseName][ModelName]) {
        triggerAfterInsert[databaseName][ModelName] = [];
    }
    return { ModelName, databaseName };
}
function deleteModelAttributeBeforeDelete(Model, triggerType) {
    const ModelName = Model.getModelName();
    const databaseName = Model.getDBSchema().databaseName;
    if (!triggerBeforeDelete[databaseName]) {
        triggerBeforeDelete[databaseName] = {};
    }
    if (!triggerBeforeDelete[databaseName][ModelName]) {
        triggerBeforeDelete[databaseName][ModelName] = [];
    }
    return { ModelName, databaseName };
}
function deleteModelAttributeAfterDelete(Model, triggerType) {
    const ModelName = Model.getModelName();
    const databaseName = Model.getDBSchema().databaseName;
    if (!triggerAfterDelete[databaseName]) {
        triggerAfterDelete[databaseName] = {};
    }
    if (!triggerAfterDelete[databaseName][ModelName]) {
        triggerAfterDelete[databaseName][ModelName] = [];
    }
    return { ModelName, databaseName };
}
export class triggers {
    static beforeInsert(Model, callback) {
        const SubscriptionName = Model.getDBSchema().databaseName + Model.getTableSchema().name + 'beforeInsert';
        const Subscription = hashCode(SubscriptionName).toString();
        const { ModelName, databaseName } = createModelAttributeBefore(Model);
        triggerBeforeInsert[databaseName][ModelName].push({ callback });
        const functionId = uniqueGenerator();
        const args = {
            type: functionId,
            callback: (row) => {
                for (const request of triggerBeforeInsert[databaseName][ModelName]) {
                    request.callback(row);
                }
            }
        };
        ModelManager.obj(Model.getDBSchema(), Model.getTableSchema()).trigger(args, Subscription);
        return {
            SubscriptionName: SubscriptionName,
            disconnect() {
                delete triggerBeforeInsert[databaseName][ModelName];
            }
        };
    }
    static AfterInsert(Model, callback) {
        const id = uniqueGenerator();
        const { ModelName, databaseName } = createModelAttributeAfter(Model);
        triggerAfterInsert[databaseName][ModelName].push({ callback });
        return {
            dispatchUID: id,
            disconnect() {
                delete triggerBeforeInsert[databaseName][ModelName];
            }
        };
    }
    static beforeDelete(Model, callback) {
        const id = uniqueGenerator();
        const { ModelName, databaseName } = deleteModelAttributeBeforeDelete(Model);
        triggerBeforeDelete[databaseName][ModelName].push({ callback });
        return {
            dispatchUID: id,
            disconnect() {
                delete triggerBeforeDelete[databaseName][ModelName];
            }
        };
    }
    static AfterDelete(Model, callback) {
        const id = uniqueGenerator();
        const { ModelName, databaseName } = deleteModelAttributeAfterDelete(Model);
        triggerAfterDelete[databaseName][ModelName].push({ callback });
        return {
            dispatchUID: id,
            disconnect() {
                delete triggerAfterDelete[databaseName][ModelName];
            }
        };
    }
}
