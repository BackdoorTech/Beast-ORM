let triggerBeforeInsert = {};
let triggerAfterInsert = {};
let triggerBeforeDelete = {};
let triggerAfterDelete = {};
function setUpSignal() { }
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
        postMessage({
            queryId: triggerBeforeInsert[databaseName][ModelName].SubscriptionName,
            value: instance
        });
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
        postMessage({
            queryId: triggerBeforeInsert[databaseName][ModelName].SubscriptionName,
            value: instance
        });
    }
    static AfterDeleteExist(Model) {
        var _a;
        const ModelName = Model.getModelName();
        const databaseName = Model.getDBSchema().databaseName;
        return (_a = triggerAfterDelete === null || triggerAfterDelete === void 0 ? void 0 : triggerAfterDelete[databaseName]) === null || _a === void 0 ? void 0 : _a[ModelName];
    }
    static async AfterDelete(instance, { modelName, databaseName }) {
    }
    static BeforeDeleteExist(Model) {
        var _a;
        const ModelName = Model.getModelName();
        const databaseName = Model.getDBSchema().databaseName;
        return (_a = triggerBeforeDelete === null || triggerBeforeDelete === void 0 ? void 0 : triggerBeforeDelete[databaseName]) === null || _a === void 0 ? void 0 : _a[ModelName];
    }
    static async BeforeDelete(instance, { modelName, databaseName }) {
    }
}
