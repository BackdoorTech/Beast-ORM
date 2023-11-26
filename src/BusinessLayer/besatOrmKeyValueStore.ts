import { KeyValueModel } from "../Presentation/Api.js";
import { IRegisterKeyValueStore } from "./beastOrm.type.js";
import { addRunTimeMethod } from "./modelManager/runtimeMethods/addRuntimeMethod.js";
import { schemaGenerator } from "./modelManager/schemaGenerator/schemaGenerator.js";

interface HiddenMethods{
  GET(KeyValue: Model): Object
  DELETE (KeyValue:  Model)
  UPDATE (dataToSave, KeyValue: Model)
}

type Model = typeof  KeyValueModel & HiddenMethods;


function executeUpdate(dataToSave, KeyValue:  Model) {
  const key = KeyValue.getTableSchema().name
  localStorage.setItem(key, JSON.stringify(dataToSave))
}

function executeSelect(KeyValue: Model) {
  const key = KeyValue.getTableSchema().name
  return  JSON.parse(localStorage.getItem(key))
}

function executeDelete(KeyValue: Model) {
  const key = KeyValue.getTableSchema().name
  localStorage.removeItem(key)
}


class BeastORMKeyValueStore{

  registerKeyValueStore = (register:IRegisterKeyValueStore) => {
    // generate schema
    const schema = schemaGenerator.generate(register as any)
    addRunTimeMethod.addGeneratedTableSchemaToModel(schema, register as any);

    for(const model of  register.models) {

      model["GET"] = (a, b) => executeSelect(a)
      model["DELETE"] = (a, b) => executeDelete(a)
      model["UPDATE"] = (a, b) => executeUpdate(a, b)

      model.clearComponent();
    }
  }

  executeUpdate(dataToSave, model: Model) {
    model.UPDATE(dataToSave, model)
  }

  executeSelect(model:Model) {
    return model.GET(model)
  }

  executeDelete(model: Model) {
    model.DELETE(model)
  }

}

export const beastORMKeyValueStore = new BeastORMKeyValueStore()
