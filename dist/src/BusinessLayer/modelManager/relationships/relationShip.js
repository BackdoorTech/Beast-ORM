import { getArgIdWithT } from "../../../Utility/Model/utils.js";
import { capitalizeFirstLetter } from "../../../Utility/utils.js";
import { modelRegistration } from "../register/register.js";
import { RuntimeMethods as RM } from "../runtimeMethods/runTimeMethods.js";
import { APIOk } from '../../../Utility/Either/APIResponse.js';
export class RelationShip {
    getMiddleTable(modelWithNoGetter, modelWithGetter) {
        const databaseName = modelWithNoGetter.getTableSchema().databaseName;
        const database = modelRegistration.getDatabase(databaseName);
        const tableName = modelWithNoGetter.getTableSchema().name + modelWithGetter.getTableSchema().name;
        const middleTable = database.getTable(tableName);
        return middleTable.model;
    }
    getMiddleTableName(modelWithNoGetter, modelWithGetter) {
        // const databaseName = modelWithNoGetter.getTableSchema().databaseName
        // const database = modelRegistration.getDatabase(databaseName)
        const tableName = modelWithNoGetter.getTableSchema().name + modelWithGetter.getTableSchema().name;
        return tableName;
        // const middleTable = database.getTable(tableName)
        // return middleTable.model.getTableSchema().name
    }
    addToMiddleTable(currentModel, otherModel, toAdd, middleTableModel) {
        const otherParameterName = otherModel.getTableSchema().name;
        const modelWithGetterTableName = capitalizeFirstLetter(currentModel.getModel().getTableSchema().name);
        const parameters = {};
        parameters["iD" + otherParameterName] = getArgIdWithT(otherModel, toAdd);
        parameters["iD" + modelWithGetterTableName] = getArgIdWithT(currentModel, currentModel);
        return middleTableModel.create(parameters);
    }
    async getAll(currentModel, otherModel, middleTableModel) {
        const parameters = {};
        const currentTableName = currentModel.getModel().getTableSchema().name;
        const otherParameterName = otherModel.getTableSchema().name;
        parameters["iD" + currentTableName] = getArgIdWithT(currentModel, currentModel);
        const [list] = await middleTableModel.filter(parameters).execute();
        const asyncOperations = list.map(async (e) => {
            await e["iD" + otherParameterName].get();
            return e["iD" + otherParameterName];
        });
        // Use Promise.all to wait for all asynchronous operations to complete
        const resolvedResults = await Promise.all(asyncOperations);
        return APIOk(resolvedResults);
    }
    generateRelationShipMethods(databaseSchema, entries, _MiddleModels) {
        const methodWithModels = [];
        for (let index = 0; index < databaseSchema.table.length; index++) {
            const currentModel = entries.models[index];
            const currentModelName = currentModel.getTableSchema().name;
            const middleTablePK = databaseSchema.table[index].middleTablePK;
            const foreignKeyLength = Object.keys(middleTablePK).length;
            if (foreignKeyLength >= 1) {
                for (const [fieldName, info] of Object.entries(middleTablePK)) {
                    let index = methodWithModels.push({
                        Model: currentModel,
                        func: []
                    });
                    const middleTableModel = _MiddleModels.find(e => {
                        if (e.getTableSchema().name == info.tableName) {
                            return true;
                        }
                    });
                    const otherModel = currentModel.getModelSchema()[fieldName].model;
                    const otherParameterName = otherModel.getTableSchema().name;
                    const currentTableName = capitalizeFirstLetter(currentModelName);
                    const funcAdd = function (Model) {
                        const parameters = {};
                        parameters["iD" + otherParameterName] = getArgIdWithT(otherModel, Model);
                        parameters["iD" + currentTableName] = getArgIdWithT(currentModel, this);
                        // console.log({parameters,currentTableName, otherParameterName })
                        return middleTableModel.create(parameters);
                    };
                    methodWithModels[index - 1].func.push({
                        name: fieldName + "Add",
                        function: funcAdd
                    });
                    const funcGetAll = async function () {
                        const parameters = {};
                        parameters["iD" + currentTableName] = getArgIdWithT(currentModel, this);
                        const [result] = await middleTableModel.filter(parameters).execute();
                        const asyncOperations = result.map(async (e) => {
                            await e["iD" + otherParameterName].get();
                            return e["iD" + otherParameterName];
                        });
                        // Use Promise.all to wait for all asynchronous operations to complete
                        const resolvedResults = await Promise.all(asyncOperations);
                        return APIOk(resolvedResults);
                    };
                    methodWithModels[index - 1].func.push({
                        name: fieldName + RM.All,
                        function: funcGetAll
                    });
                }
            }
        }
        return methodWithModels;
    }
}
export const relationShip = new RelationShip();
