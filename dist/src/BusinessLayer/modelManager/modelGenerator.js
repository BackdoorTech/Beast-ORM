import { Model } from "../../Presentation/Api.js";
import { RuntimeMethods as RM } from "./runtimeMethods/runTimeMethods.js";
import { ok } from "../../Utility/Either/index.js";
import { ForeignKey, _RealPrototype } from "../../Presentation/Model/fields/fieldsWrappers.js";
class ModelGeneration {
    forMiddleTables(schema, register) {
        const models = [];
        for (const middleTablesSchema of schema.middleTables) {
            const model = this.generateGenericModel(middleTablesSchema.name, middleTablesSchema, register);
            models.push(model);
        }
        return models;
    }
    generateGenericModel(ModelName, middleTableSchema, register) {
        console.log("generateGenericModel", middleTableSchema);
        class GenericModel extends Model {
        }
        const model = GenericModel;
        GenericModel.prototype[RM.getModel] = () => {
            return model;
        };
        GenericModel[RM.getModel] = () => {
            return model;
        };
        GenericModel[RM.getTableSchema] = () => {
            return middleTableSchema;
        };
        GenericModel.prototype[RM.getTableSchema] = () => {
            return middleTableSchema;
        };
        GenericModel[RM.validator] = () => {
            return ok(true);
        };
        for (const [fieldName, info] of Object.entries(middleTableSchema.foreignKey)) {
            const model = register.models.find(e => e.getTableSchema().name == info.tableName);
            GenericModel.prototype[fieldName + "F"] = () => {
                return ForeignKey({ model });
            };
        }
        const object = {};
        for (const [fieldName, info] of Object.entries(middleTableSchema.foreignKey)) {
            const model = register.models.find(e => e.getTableSchema().name == info.tableName);
            object[fieldName] = _RealPrototype.ForeignKey({ model: model });
            Object.defineProperty(GenericModel.prototype, fieldName, {
                get() {
                    return this[fieldName + "F"]();
                },
                set(arg) {
                    const e = this[fieldName + "F"]();
                    e.setPrimaryKey(arg);
                    this[fieldName + "F"] = () => e;
                }
            });
        }
        GenericModel.getModelSchema = function () { return object; };
        return GenericModel;
    }
}
export const modelGeneration = new ModelGeneration();
