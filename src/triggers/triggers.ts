import { ModelManager } from "../models/model-manager.js";
import { Model } from "../models/model.js";
import { hashCode, uniqueGenerator } from "../utils.js";

interface Trigger {
    callback: Function
}

let triggerBeforeInsert: {[key:string]: {[key:string]: Trigger[]}} = {}
let triggerAfterInsert: {[key:string]: {[key:string]: Trigger[]}}  = {}

let triggerBeforeDelete: {[key:string]: {[key:string]: Trigger[]}} = {}
let triggerAfterDelete: {[key:string]: {[key:string]: Trigger[]}}  = {}


function createModelAttributeBefore(Model: Model, triggerType?) {
    const ModelName = Model.getModelName()
    const databaseName = Model.getDBSchema().databaseName

    if(!triggerBeforeInsert[databaseName]) {
        triggerBeforeInsert[databaseName] = {}
    }
    if(!triggerBeforeInsert[databaseName][ModelName]) {
        triggerBeforeInsert[databaseName][ModelName] = []
    }
    return { ModelName, databaseName}
}

function createModelAttributeAfter(Model: Model, triggerType?) {
    const ModelName = Model.getModelName()
    const databaseName = Model.getDBSchema().databaseName

    if(!triggerAfterInsert[databaseName]) {
        triggerAfterInsert[databaseName] = {}
    }
    if(!triggerAfterInsert[databaseName][ModelName]) {
        triggerAfterInsert[databaseName][ModelName] = []
    }
    return { ModelName, databaseName}
}


function deleteModelAttributeBeforeDelete(Model: Model, triggerType?) {
    const ModelName = Model.getModelName()
    const databaseName = Model.getDBSchema().databaseName

    if(!triggerBeforeDelete[databaseName]) {
        triggerBeforeDelete[databaseName] = {}
    }
    if(!triggerBeforeDelete[databaseName][ModelName]) {
        triggerBeforeDelete[databaseName][ModelName] = []
    }
    return { ModelName, databaseName}
}

function deleteModelAttributeAfterDelete(Model: Model, triggerType?) {
    const ModelName = Model.getModelName()
    const databaseName = Model.getDBSchema().databaseName

    if(!triggerAfterDelete[databaseName]) {
        triggerAfterDelete[databaseName] = {}
    }
    if(!triggerAfterDelete[databaseName][ModelName]) {
        triggerAfterDelete[databaseName][ModelName] = []
    }
    return { ModelName, databaseName}
}
export class triggers {
    static beforeInsert(Model: Model, callback: Function) {

        const SubscriptionName = Model.getDBSchema().databaseName + Model.getTableSchema().name + 'beforeInsert'
        const Subscription = hashCode(SubscriptionName).toString()
        const { ModelName, databaseName } = createModelAttributeBefore(Model)
        triggerBeforeInsert[databaseName][ModelName].push({callback})
        const functionId = uniqueGenerator();

        const args = {
            type: functionId,
            callback: (row) => {
                for (const request of triggerBeforeInsert[databaseName][ModelName]) {
                    request.callback(row)
                }
            }
        }

        ModelManager.obj(Model.getDBSchema(), Model.getTableSchema()).trigger(args, Subscription)
        
        return {
            SubscriptionName: SubscriptionName,
            disconnect() {
                delete triggerBeforeInsert[databaseName][ModelName]
            }
        }
    }
    static AfterInsert(Model: any, callback: Function) {

        const id = uniqueGenerator()
        const { ModelName, databaseName } = createModelAttributeAfter(Model)
        triggerAfterInsert[databaseName][ModelName].push({callback})
        return {
            dispatchUID: id,
            disconnect() {
                delete triggerBeforeInsert[databaseName][ModelName]
            }
        }
    }
    static beforeDelete(Model: any, callback: Function) {

        const id = uniqueGenerator()
        const { ModelName, databaseName } = deleteModelAttributeBeforeDelete(Model)
        triggerBeforeDelete[databaseName][ModelName].push({callback})
        return {
            dispatchUID: id,
            disconnect() {
                delete triggerBeforeDelete[databaseName][ModelName]
            }
        }
    }
    static AfterDelete(Model: any, callback: Function) {

        const id = uniqueGenerator()
        const { ModelName, databaseName } = deleteModelAttributeAfterDelete(Model)
        triggerAfterDelete[databaseName][ModelName].push({callback})
        return {
            dispatchUID: id,
            disconnect() {
                delete triggerAfterDelete[databaseName][ModelName]
            }
        }
    }
}


export class triggerSignal {

    static beforeInsertExist(Model) {
        const ModelName = Model.getModelName()
        const databaseName = Model.getDBSchema().databaseName
        return triggerBeforeInsert?.[databaseName]?.[ModelName]
    }
    static async beforeInsert(instance: Model) {
        const ModelName = instance.getModelName()
        const databaseName = instance.getDBSchema().databaseName

        for (const trigger of triggerBeforeInsert[databaseName][ModelName]) {
            trigger.callback(instance)
        }
    }

    static AfterInsertExist(Model) {
        const ModelName = Model.getModelName()
        const databaseName = Model.getDBSchema().databaseName
        return triggerAfterInsert?.[databaseName]?.[ModelName]
    }
    static async AfterInsert(instance: Model) {
        const ModelName = instance.getModelName()
        const databaseName = instance.getDBSchema().databaseName

        for (const trigger of triggerAfterInsert[databaseName][ModelName]) {
            trigger.callback(instance)
        }
    }


    static AfterDeleteExist(Model) {
        const ModelName = Model.getModelName()
        const databaseName = Model.getDBSchema().databaseName
        return triggerAfterDelete?.[databaseName]?.[ModelName]
    }
    static async AfterDelete(instance:Model | string, {modelName, databaseName}: any) {

        for (const trigger of triggerAfterDelete[databaseName][modelName]) {
            trigger.callback(instance)
        }
    }

    static BeforeDeleteExist(Model) {
        const ModelName = Model.getModelName()
        const databaseName = Model.getDBSchema().databaseName
        return triggerBeforeDelete?.[databaseName]?.[ModelName]
    }
    static async BeforeDelete(instance:Model | string,  {modelName, databaseName}) {
        for (const trigger of triggerBeforeDelete[databaseName][modelName]) {
            trigger.callback(instance)
        }
    }
}