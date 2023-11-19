import { uniqueGenerator } from "../../../../Utility/utils.js"
import { IReturnObject, IReturnTriggerObject } from "../../../DriverAdapters/DriverAdapter.type"

interface Trigger {
  callback: Function
}

export class DatabaseTriggerService {

  preCreate: {[eventName:string]: {[tableName:string]: {[key:string]: Trigger[]} }} = {}
  postCreate: {[eventName:string]: {[tableName:string]: {[key:string]: Trigger[]} }} = {}
  onCompleteReadTransaction: {[eventName:string]: {[tableName:string]: {[key:string]: Trigger[]} }} = {}

  subscribe(eventName: string, ModelName: string, callback: IReturnTriggerObject ) {
    if(!this[eventName]) {
      this[eventName] = {}
    }
    if(!this[eventName][ModelName]) {
      this[eventName][ModelName] = []
    }

    const subscriptionId = uniqueGenerator()
    this[eventName][ModelName][subscriptionId] = {...callback}
    callback.onsuccess({subscriptionId})
  }

  unsubscribe(eventName: string, ModelName: string,subscriptionId, callback: IReturnTriggerObject ) {
    delete this[eventName][ModelName][subscriptionId]
  }


  executeTriggers(eventName: string, ModelName: string) {
    if (this[eventName][ModelName]) {
      for (const [subscriptionId, value] of Object.entries( this[eventName][ModelName]|| {})) {
        (value as any).stream({subscriptionId})
      }
    }
  }
}
