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
        const args = {};
        const eventHandler = () => {
        };
        ModelManager.obj(Model.getDBSchema(), Model.getTableSchema()).trigger(args, Subscription, eventHandler);
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
export class triggerSignal {
    static beforeInsertExist(Model) {
        var _a;
        const ModelName = Model.getModelName();
        const databaseName = Model.getDBSchema().databaseName;
        return (_a = triggerBeforeInsert === null || triggerBeforeInsert === void 0 ? void 0 : triggerBeforeInsert[databaseName]) === null || _a === void 0 ? void 0 : _a[ModelName];
    }
    static async beforeInsert(instance) {
        const ModelName = instance.getModelName();
        const databaseName = instance.getDBSchema().databaseName;
        for (const trigger of triggerBeforeInsert[databaseName][ModelName]) {
            trigger.callback(instance);
        }
    }
    static AfterInsertExist(Model) {
        var _a;
        const ModelName = Model.getModelName();
        const databaseName = Model.getDBSchema().databaseName;
        return (_a = triggerAfterInsert === null || triggerAfterInsert === void 0 ? void 0 : triggerAfterInsert[databaseName]) === null || _a === void 0 ? void 0 : _a[ModelName];
    }
    static async AfterInsert(instance) {
        const ModelName = instance.getModelName();
        const databaseName = instance.getDBSchema().databaseName;
        for (const trigger of triggerAfterInsert[databaseName][ModelName]) {
            trigger.callback(instance);
        }
    }
    static AfterDeleteExist(Model) {
        var _a;
        const ModelName = Model.getModelName();
        const databaseName = Model.getDBSchema().databaseName;
        return (_a = triggerAfterDelete === null || triggerAfterDelete === void 0 ? void 0 : triggerAfterDelete[databaseName]) === null || _a === void 0 ? void 0 : _a[ModelName];
    }
    static async AfterDelete(instance, { modelName, databaseName }) {
        for (const trigger of triggerAfterDelete[databaseName][modelName]) {
            trigger.callback(instance);
        }
    }
    static BeforeDeleteExist(Model) {
        var _a;
        const ModelName = Model.getModelName();
        const databaseName = Model.getDBSchema().databaseName;
        return (_a = triggerBeforeDelete === null || triggerBeforeDelete === void 0 ? void 0 : triggerBeforeDelete[databaseName]) === null || _a === void 0 ? void 0 : _a[ModelName];
    }
    static async BeforeDelete(instance, { modelName, databaseName }) {
        for (const trigger of triggerBeforeDelete[databaseName][modelName]) {
            trigger.callback(instance);
        }
    }
}
