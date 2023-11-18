import { Model } from "../../../Presentation/Api"
import { getArgIdWithT } from "../../../Utility/Model/utils.js"
import { capitalizeFirstLetter } from "../../../Utility/utils.js"
import { IRegister } from "../../beastOrm.type.js"
import { modelRegistration } from "../register/register.js"


export class RelationShip {

  getMiddleTable(modelWithNoGetter: typeof Model<any>, modelWithGetter : typeof Model<any>) {
    const databaseName = modelWithNoGetter.getTableSchema().databaseName
    const database = modelRegistration.getDatabase(databaseName)

    const tableName = modelWithNoGetter.getTableSchema().name + modelWithGetter.getTableSchema().name
    const middleTable = database.getTable(tableName)

    return middleTable.model
  }


  getMiddleTableName(modelWithNoGetter: typeof Model<any>, modelWithGetter : typeof Model<any>) {
    // const databaseName = modelWithNoGetter.getTableSchema().databaseName
    // const database = modelRegistration.getDatabase(databaseName)

    const tableName = modelWithNoGetter.getTableSchema().name + modelWithGetter.getTableSchema().name

    return tableName
    // const middleTable = database.getTable(tableName)

    // return middleTable.model.getTableSchema().name
  }

  addToMiddleTable<T>(currentModel: Model<any>, otherModel : typeof Model<any>, toAdd:  Model<any>, middleTableModel: typeof Model<any>) {
    const otherParameterName = otherModel.getTableSchema().name
    const modelWithGetterTableName = capitalizeFirstLetter(currentModel.getModel().getTableSchema().name)
    const parameters = {}

    parameters["iD"+otherParameterName] = getArgIdWithT(otherModel, toAdd)
    parameters["iD"+modelWithGetterTableName] = getArgIdWithT(currentModel, currentModel)

    return middleTableModel.create<T>(parameters)
  }


  async getAll<T>(currentModel: Model<any>, otherModel : typeof Model<any>, middleTableModel: typeof Model<any>) {

    const parameters = {}
    const currentTableName = currentModel.getModel().getTableSchema().name
    const otherParameterName = otherModel.getTableSchema().name

    parameters["iD"+currentTableName] = getArgIdWithT(currentModel, currentModel)

    const result: any[] =  await middleTableModel.filter<T>(parameters).execute() as any

    const asyncOperations = result.map(async (e) => {
      await e["iD" + otherParameterName].get();
      return e["iD" + otherParameterName];
    });


    // Use Promise.all to wait for all asynchronous operations to complete
    const resolvedResults = await Promise.all(asyncOperations);

    return resolvedResults;
  }


}

export const relationShip = new RelationShip()
