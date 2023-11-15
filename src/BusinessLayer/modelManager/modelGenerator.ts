import { Model } from "../../Presentation/Api.js";
import { IDatabaseSchema } from "../_interface/interface.type";
import { RuntimeMethods as RM } from "./runtimeMethods/runTimeMethods.js";

class ModelGeneration {

  forMiddleTables(schema: IDatabaseSchema): typeof Model<any>[] {
    const models: typeof Model<any>[] = []
    for(const middleTablesSchema of schema.middleTables) {
      const model = this.generateGenericModel(middleTablesSchema.name , middleTablesSchema)
      models.push(model)
    }

    return models
  }

  private generateGenericModel (ModelName, middleTableSchema) {

    class GenericModel extends  Model<GenericModel> {}

    const model = GenericModel

    GenericModel.prototype[RM.getModel] = () => {
      return model
    }

    GenericModel[RM.getTableSchema] = () => {
      return middleTableSchema
    }

    GenericModel.prototype[RM.getTableSchema] = () => {
      return middleTableSchema
    }

    return GenericModel
  }
}

export const modelGeneration = new ModelGeneration()
