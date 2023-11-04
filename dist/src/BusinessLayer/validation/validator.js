import { error, ok } from '../../Utility/Either/index.js';
import { ValidationError } from './error/ValidationError.js';
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
        const data = new Model();
        return (Object) => {
            for (const fieldName of tableSchema.fieldNames) {
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
