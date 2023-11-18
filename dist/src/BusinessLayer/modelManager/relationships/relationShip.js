import { getArgIdWithT } from "../../../Utility/Model/utils.js";
import { capitalizeFirstLetter } from "../../../Utility/utils.js";
import { modelRegistration } from "../register/register.js";
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
        const result = await middleTableModel.filter(parameters).execute();
        const asyncOperations = result.map(async (e) => {
            await e["iD" + otherParameterName].get();
            return e["iD" + otherParameterName];
        });
        // Use Promise.all to wait for all asynchronous operations to complete
        const resolvedResults = await Promise.all(asyncOperations);
        return resolvedResults;
    }
}
export const relationShip = new RelationShip();
