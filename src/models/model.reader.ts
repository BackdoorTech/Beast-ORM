import { models } from "../index.js";
import { FieldsMap, FieldKeys, FieldKeysArray, AttributesMap, FieldAttributesKeys } from './field/fields.interface.js'

export class ModelReader {

  static read(modelClassRepresentation) {

    const classInstance: typeof models.Model = new modelClassRepresentation()

    const modelName = classInstance.getModelName()
    const fieldTypes: FieldsMap<FieldKeys, string[]> = {}
    const fields: {[ key: string]: any} = {}
    const attributes: AttributesMap<FieldAttributesKeys, string[]> = {}
    
    for( const [fieldName, Field] of Object.entries(classInstance)) {
      
      const type = Field?.fieldName
      if(FieldKeysArray.includes(type)) {

        fields[fieldName] = Field
        
        if(!fieldTypes[type]) {
          fieldTypes[type] = []
        }
        
        fieldTypes[type].push(fieldName)

        for (const [FieldProperty, value] of Object.entries(Field)) {
          if( typeof value !="function") {

            if(!attributes[FieldProperty]) {
              attributes[FieldProperty] = []
            }

            attributes[FieldProperty].push(fieldName)
          }
        }
      }
    }

    return {
      modelName,
      fields,
      fieldTypes,
      attributes,
    }
  }


}

