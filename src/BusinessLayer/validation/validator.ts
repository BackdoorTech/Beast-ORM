import { ITableSchema } from '../_interface/interface'
import { Either, error, ok} from '../../Utility/Either/index.js'
import { ValidationError } from './error/ValidationError.js'
import { Model as ModelType } from '../../Presentation/Api';
import { FormValidationError, field } from './fields/allFields.type';

class Validator {

  validateFromSchema(tableSchema: ITableSchema, data: Object): Either<true, ValidationError> {

    const requiredFieldNames = this.requiredFields(tableSchema)
    for(const fieldName of requiredFieldNames) {
      if(data.hasOwnProperty(fieldName) == false) {

        return error(new ValidationError())
      }
    }

    return ok(true)
  }

  requiredFields(tableSchema: ITableSchema) {
    const fieldNames: string[] = []
    for(const field of tableSchema.fields) {
      if(!field.blank) {
        fieldNames.push(field.name)
      }
    }

    return fieldNames
  }

  ModelValidator(Model:typeof ModelType<any>, tableSchema: ITableSchema): (value: any) => FormValidationError {

    const data = new Model()

    return (Object: string):  FormValidationError => {

      for(const fieldName of tableSchema.fieldNames) {
        const validator: field = data[fieldName]

        const value = Object[fieldName]
        const result = validator.valid(value)

        if(result.isError) {
          return result
        }
      }
      return ok(true)
    }
  }
}

export const validator = new Validator()
