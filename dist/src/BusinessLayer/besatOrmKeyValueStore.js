import { addRunTimeMethod } from "./modelManager/runtimeMethods/addRuntimeMethod.js";
import { schemaGenerator } from "./modelManager/schemaGenerator/schemaGenerator.js";
function executeUpdate(dataToSave, KeyValue) {
    const key = KeyValue.getTableSchema().name;
    localStorage.setItem(key, JSON.stringify(dataToSave));
}
function executeSelect(KeyValue) {
    const key = KeyValue.getTableSchema().name;
    return JSON.parse(localStorage.getItem(key));
}
function executeDelete(KeyValue) {
    const key = KeyValue.getTableSchema().name;
    localStorage.removeItem(key);
}
class BeastORMKeyValueStore {
    constructor() {
        this.registerKeyValueStore = (register) => {
            // generate schema
            const schema = schemaGenerator.generate(register);
            addRunTimeMethod.addGeneratedTableSchemaToModel(schema, register);
            for (const model of register.models) {
                model["GET"] = (a, b) => executeSelect(a);
                model["DELETE"] = (a, b) => executeDelete(a);
                model["UPDATE"] = (a, b) => executeUpdate(a, b);
                model.clearComponent();
            }
        };
    }
    executeUpdate(dataToSave, model) {
        model.UPDATE(dataToSave, model);
    }
    executeSelect(model) {
        return model.GET(model);
    }
    executeDelete(model) {
        model.DELETE(model);
    }
}
export const beastORMKeyValueStore = new BeastORMKeyValueStore();
