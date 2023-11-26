import { Model } from "../../../Presentation/Api.js";
import { GustPrototype, RealPrototype } from "../../../Presentation/Model/fields/fieldsWrappers.js";
import { IDatabaseSchema, IMethodWithModels } from "../../_interface/interface.type.js";
import { IRegister } from "../../beastOrm.type.js";
import { RuntimeMethods as RM } from "./runTimeMethods.js";

export class AddRunTimeMethod {

  addModelSchema(register:IRegister) {
    for (const model of  register.models) {

      RealPrototype()
      const modelSchema = new  model()
      GustPrototype()

      model.getModelSchema = () => {
        return modelSchema  as any
      }

    }
  }


  /**
   * Attaches generated table schema to model classes.
   * @param {DatabaseSchema} databaseSchema - The database schema to extract table information from.
   * @param {Object} entries - An object containing model classes.
   */
  addGeneratedTableSchemaToModel(databaseSchema:IDatabaseSchema, entries: IRegister) {
    for (let index = 0; index < entries.models.length; index++) {

      // Get the table schema class for the current model.
      const tableSchemaClass = databaseSchema.table[index];

      // Add a static method to the model for accessing the table schema.
      entries.models[index][RM.getTableSchema] = () => {
        return tableSchemaClass;
      }

      entries.models[index].prototype[RM.getTableSchema] = () => {
        return tableSchemaClass;
      }
    }
  }

  attachRelationShipMethods(methodWithModels: IMethodWithModels[]) {

    for(const methodWithModel of methodWithModels) {
      const model = methodWithModel.Model
      for (const FUNCOBJT  of methodWithModel.func) {
        const func = FUNCOBJT.function
        const functionName = FUNCOBJT.name

        model.prototype[functionName] = func

      }
    }
  }


  addStaticFunctionFWrap(_Model:typeof Model<any>, methodName: string, value:object) {
    // Add a static method to the model for accessing the table schema.

    _Model[methodName] = function () {
      return value
    }

  }

  addFunctionFWrap(_Model:typeof Model<any>, methodName: string, value:object) {
    // Add a static method to the model for accessing the table schema.

    _Model.prototype[methodName] = function () {
      return value
    }

  }

  addStaticFunction(_Model:typeof Model<any>, methodName: string, func:Function) {
    // Add a static method to the model for accessing the table schema.

    // Add a static method to the model for accessing the table schema.
    Model[methodName] =  func

  }


}

export const addRunTimeMethod = new AddRunTimeMethod()
