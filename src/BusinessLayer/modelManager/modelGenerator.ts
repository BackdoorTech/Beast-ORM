import { Model } from "../../Presentation/Api.js";
import { IDatabaseSchema, ITableSchema } from "../_interface/interface.type";
import { RuntimeMethods as RM } from "./runtimeMethods/runTimeMethods.js";
import { ok } from "../../Utility/Either/APIResponse.js";
import { ForeignKey, _RealPrototype } from "../../Presentation/Model/fields/fieldsWrappers.js";
import { IRegister } from "../beastOrm.type.js";

class ModelGeneration {

  forMiddleTables(schema: IDatabaseSchema, register:IRegister): typeof Model<any>[] {
    const models: typeof Model<any>[] = []
    for(const middleTablesSchema of schema.middleTables) {
      const model = this.generateGenericModel(middleTablesSchema.name , middleTablesSchema, register)
      models.push(model)
    }

    return models
  }

  private generateGenericModel (ModelName, middleTableSchema: ITableSchema, register:IRegister) {

    // console.log("generateGenericModel", middleTableSchema)
    class GenericModel extends  Model<GenericModel> {}

    const model = GenericModel

    GenericModel.prototype[RM.getModel] = () => {
      return model
    }

    GenericModel[RM.getModel] = () => {
      return model
    }

    GenericModel[RM.getTableSchema] = () => {
      return middleTableSchema
    }

    GenericModel.prototype[RM.getTableSchema] = () => {
      return middleTableSchema
    }

    GenericModel[RM.validator] = () => {
      return ok(true)
    }

    for (const [fieldName, info] of Object.entries(middleTableSchema.foreignKey)) {
      const model = register.models.find( e => e.getTableSchema().name == info.tableName)
      GenericModel.prototype[fieldName+"F"] = () => {
        return ForeignKey({model})
      }
    }

    const object = {}
    for (const [fieldName, info] of Object.entries(middleTableSchema.foreignKey)) {

      const model = register.models.find( e => e.getTableSchema().name == info.tableName)
      object[fieldName] = _RealPrototype.ForeignKey({model: model})

      Object.defineProperty(GenericModel.prototype, fieldName, {
        get () {
          return this[fieldName+"F"]()
        },
        set (arg) {
          const e = this[fieldName+"F"]()
          e.setPrimaryKey(arg)
          this[fieldName+"F"] = () => e
        }
      })

    }

    GenericModel.getModelSchema = function () { return object }

    return GenericModel
  }
}

export const modelGeneration = new ModelGeneration()
