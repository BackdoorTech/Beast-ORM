import { Model } from "../../Presentation/Api";
import { ITableSchema } from "../_interface/interface.type";

export class DataParameters {
  getFilteredData(tableSchema: ITableSchema, data: Object) {

    const filteredData = {}

    for(const field of tableSchema.fieldNames) {
      if(field in data) {
        filteredData[field]= data[field]
      } else {
        filteredData[field]= undefined
      }
    }

    if(tableSchema.fieldTypes.OneToOneField) {
      for(const fieldName of tableSchema.fieldTypes.OneToOneField) {

        const model : Model<any>=  data[fieldName]
        const KeyValue = model.getPrimaryKeyValue()
        filteredData[fieldName]= KeyValue

      }
    }

    if(tableSchema.fieldTypes.ForeignKey) {
      for(const fieldName of tableSchema.fieldTypes.ForeignKey) {
        const model : Model<any> =  data[fieldName]
        const KeyValue = model.getPrimaryKeyValue()
        filteredData[fieldName]= KeyValue

      }
    }

    if(tableSchema.fieldTypes.ManyToManyField) {
      for(const fieldName of tableSchema.fieldTypes.ManyToManyField) {
        const model : Model<any> =  data[fieldName]
        const KeyValue = model.getPrimaryKeyValue()
        filteredData[fieldName]= KeyValue
      }
    }

    return filteredData
  }


  getUniqueData(tableSchema: ITableSchema, data: Object) {

    const uniqueFields = tableSchema.attributes.unique || []
    uniqueFields.push(tableSchema.id.keyPath)

    const filteredData = {}

    for(const field of uniqueFields) {
      if(field in data) {
        filteredData[field]= data[field]
      }
    }

    if(tableSchema.fieldTypes.OneToOneField) {
      for(const fieldName of tableSchema.fieldTypes.OneToOneField) {

        const model : Model<any>=  data[fieldName]
        const KeyValue = model.getPrimaryKeyValue()
        filteredData[fieldName]= KeyValue

      }
    }

    return filteredData
  }

  hasField(data: Object) {
    return Object.keys(data).length >= 1
  }

  getFilteredDataWithId(tableSchema: ITableSchema, data: Object) {

    const filteredData = {}
    tableSchema.fieldNames.push(tableSchema.id.keyPath)

    for(const field of tableSchema.fieldNames) {
      filteredData[field]= data[field]
    }

    for(const fieldName of tableSchema.fieldTypes["OneToOneField"]) {

      const model : Model<any>=  data[fieldName]
      const KeyValue = model.getPrimaryKeyValue()
      filteredData[fieldName]= KeyValue
    }

    for(const fieldName of tableSchema.fieldTypes.ForeignKey) {

      const model : Model<any>=  data[fieldName]
      const KeyValue = model.getPrimaryKeyValue()
      filteredData[fieldName]= KeyValue
    }

    return filteredData
  }

  getFilteredDataOverlay(tableSchema: ITableSchema, data: Object) {

    const filteredData = {}

    for(const [key, value] of Object.entries(data)) {
      const found = tableSchema.fieldNames.find( x => x==key)

      if(found) {
        filteredData[value] = key
      }

    }

    return filteredData
  }


  setDataToInstance() {}

}


export const dataParameters = new DataParameters()
