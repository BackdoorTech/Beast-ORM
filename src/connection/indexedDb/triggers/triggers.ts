

interface Trigger {
    callback: Function,
    SubscriptionName: string
}

let triggerBeforeInsert: {[key:string]: {[key:string]: Trigger}} = {}
let triggerAfterInsert: {[key:string]: {[key:string]: Trigger}}  = {}

let triggerBeforeDelete: {[key:string]: {[key:string]: Trigger}} = {}
let triggerAfterDelete: {[key:string]: {[key:string]: Trigger}}  = {}


function setUpSignal() {}

export class triggerSignal {

    static beforeInsertExist(Model) {
        const ModelName = Model.getTableSchema().name
        const databaseName = Model.getDBSchema().databaseName
        return triggerBeforeInsert?.[databaseName]?.[ModelName]
    }
    static async beforeInsert(instance) {
        const ModelName = instance.getTableSchema().name
        const databaseName = instance.getDBSchema().databaseName
        postMessage({
            queryId: triggerBeforeInsert[databaseName][ModelName].SubscriptionName,
            value: instance
        })
    }

    static AfterInsertExist(Model) {
        const ModelName = Model.getTableSchema().name
        const databaseName = Model.getDBSchema().databaseName
        return triggerAfterInsert?.[databaseName]?.[ModelName]
    }
    static async AfterInsert(instance) {
        const ModelName = instance.getTableSchema().name
        const databaseName = instance.getDBSchema().databaseName
        postMessage({
            queryId: triggerBeforeInsert[databaseName][ModelName].SubscriptionName,
            value: instance
        })

    }

    static AfterDeleteExist(Model) {
        const ModelName = Model.getTableSchema().name
        const databaseName = Model.getDBSchema().databaseName
        return triggerAfterDelete?.[databaseName]?.[ModelName]
    }
    static async AfterDelete(instance: string, {modelName, databaseName}: any) {

    }

    static BeforeDeleteExist(Model) {
        const ModelName = Model.getTableSchema().name
        const databaseName = Model.getDBSchema().databaseName
        return triggerBeforeDelete?.[databaseName]?.[ModelName]
    }
    static async BeforeDelete(instance: string,  {modelName, databaseName}) {

    }
}