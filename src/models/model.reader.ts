import { models } from "../index.js";
import { FieldsMap, FieldKeys, FieldKeysArray, AttributesMap, FieldAttributesKeys } from './field/fields.interface.js'

export class ModelReader {

  static id({attributes}) {
    // Check if the attributes object and primaryKey array exist,
    // then return the first element of the primaryKey array,
    // otherwise, return 'id' as the default value.
    return attributes?.primaryKey?.[0] || 'id'
  }

  static read(modelClassRepresentation) {

    const classInstance: typeof models.Model = new modelClassRepresentation()

    const modelName = classInstance.getModelName()
    const fieldTypes: FieldsMap<FieldKeys, string[]> = {}
    const fields: {[ key: string]: any} = {}
    const attributes: AttributesMap<FieldAttributesKeys, string[]> = {}
    const fieldNames  = []

    for( const [fieldName, Field] of Object.entries(classInstance)) {

      const type = Field?.fieldName
      if(FieldKeysArray.includes(type)) {
        fieldNames.push(fieldName)

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
      } else {
        fields[fieldName] = Field

        if(!fieldTypes["Unknown"]) {
          fieldTypes["Unknown"] = []
        }

        fieldTypes["Unknown"].push(fieldName)
      }

    }

    const id = this.id({attributes})

    return {
      modelName,
      fields,
      fieldTypes,
      attributes,
      fieldNames,
      id
    }
  }


}

export class LocalStorageModelReader {
  static read(modelClassRepresentation, ignoreFieldsStartWidth: string[]) {
    const classInstance: typeof models.LocalStorage = modelClassRepresentation

    const fieldTypes: FieldsMap<FieldKeys, string[]> = {}
    const attributes: AttributesMap<FieldAttributesKeys, string[]> = {}
    const modelName = classInstance.getModelName()
    const fields: {[ key: string]: any} = {}


    for( const [fieldName, Field] of Object.entries(classInstance)) {

      const ignore = ignoreFieldsStartWidth.find( e=> fieldName.startsWith(e))

      if(!ignore) {

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
        } else {
          fields[fieldName] = Field

          if(!fieldTypes["Unknown"]) {
            fieldTypes["Unknown"] = []
          }

          fieldTypes["Unknown"].push(fieldName)
        }
      }
    }

    return {
      modelName,
      fields,
      attributes,
      fieldTypes
    }
  }
}
