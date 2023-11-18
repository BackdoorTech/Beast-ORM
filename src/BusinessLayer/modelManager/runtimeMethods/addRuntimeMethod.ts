import { GustPrototype, RealPrototype } from "../../../Presentation/Model/fields/fieldsWrappers.js";
import { IRegister } from "../../beastOrm.type.js";
import { RuntimeMethods as RM } from "./runTimeMethods.js";

export class AddRunTimeMethod {

  addModelSchema(register:IRegister) {
    for (const model of  register.models) {

      RealPrototype()
      const modelSchema = new  model()
      GustPrototype()

      model.getModelSchema = () => {
        return modelSchema
      }

    }
  }

}

export const addRunTimeMethod = new AddRunTimeMethod()
