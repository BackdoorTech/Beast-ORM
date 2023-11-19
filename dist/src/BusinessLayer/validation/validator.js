import { error, ok } from '../../Utility/Either/APIResponse.js';
import { ValidationError } from './error/ValidationError.js';
import { RuntimeMethods as RM } from '../modelManager/runtimeMethods/runTimeMethods.js';
class Validator {
    validateFromSchema(tableSchema, data) {
        const requiredFieldNames = this.requiredFields(tableSchema);
        for (const fieldName of requiredFieldNames) {
            if (data.hasOwnProperty(fieldName) == false) {
                return error(new ValidationError());
            }
        }
        return ok(true);
    }
    requiredFields(tableSchema) {
        const fieldNames = [];
        for (const field of tableSchema.fields) {
            if (!field.blank) {
                fieldNames.push(field.name);
            }
        }
        return fieldNames;
    }
    ModelValidator(Model, tableSchema) {
        const data = Model[RM.getModelSchema]();
        const relationship = tableSchema.fieldTypes["OneToOneField"] || [];
        const fieldNames = tableSchema.fieldNames.filter(e => !relationship.find(b => b == e));
        return (Object) => {
            for (const fieldName of fieldNames) {
                const validator = data[fieldName];
                const value = Object[fieldName];
                const result = validator.valid(value);
                if (result.isError) {
                    return result;
                }
            }
            return ok(true);
        };
    }
}
export const validator = new Validator();
