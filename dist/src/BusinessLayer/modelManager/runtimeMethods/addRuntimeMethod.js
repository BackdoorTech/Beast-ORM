import { GustPrototype, RealPrototype } from "../../../Presentation/Model/fields/fieldsWrappers.js";
export class AddRunTimeMethod {
    addModelSchema(register) {
        for (const model of register.models) {
            RealPrototype();
            const modelSchema = new model();
            GustPrototype();
            model.getModelSchema = () => {
                return modelSchema;
            };
        }
    }
}
export const addRunTimeMethod = new AddRunTimeMethod();
