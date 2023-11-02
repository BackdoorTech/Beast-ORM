import { ITableSchema } from '../_interface/interface'

class validator {

  validateFromSchema(tableSchema: ITableSchema, data: Object) {

    const requiredFieldNames = this.requiredFields(tableSchema)
    for(const fieldName of requiredFieldNames) {
      if(!data.hasOwnProperty(fieldName)) {
        return false
      }
    }

    return true
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
}
