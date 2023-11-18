import { Model } from "../../../Presentation/Api.js";
import { capitalizeFirstLetter } from "../../../Utility/utils.js";
import { ITableSchema } from "../../_interface/interface.type.js";
import { FieldType } from "../../fields/fields.type.js";
import { RuntimeMethods as RM } from "../runtimeMethods/runTimeMethods.js";

export class MiddleTable {

  addMiddleTable(foreignKeyFieldName:string, foreignKeyTableName, ArgCurrentModelName: string, databaseName: string): ITableSchema {

    const foreignKeyModelName = capitalizeFirstLetter(foreignKeyTableName)
    const currentModelName = capitalizeFirstLetter(ArgCurrentModelName)

    const tableName = capitalizeFirstLetter(currentModelName)  + foreignKeyModelName

    const middleTableSchema: ITableSchema = {
      databaseName: databaseName,
      name: tableName,
      id: { keyPath: 'id', autoIncrement: true, type: FieldType.INT },
      fields: [
        {
          name: 'iD' + foreignKeyModelName,
          keyPath: 'iD' + foreignKeyModelName,
          blank: false,
          fieldAttributes: {},
          options: {
            unique: false,
            type: FieldType.INT
          },
          className: 'ForeignKey'
        },
        {
          name: 'iD' + currentModelName,
          keyPath: 'iD' + currentModelName,
          blank: false,
          fieldAttributes: {},
          options: {
            unique: false,
            type: FieldType.INT
          },
          className: 'ForeignKey'
        }
      ],
      attributes: {},
      foreignKey: {},
      fieldTypes: {
        IntegerField: ['iD' + foreignKeyModelName, 'iD' + currentModelName]
      },
      fieldNames: ['iD' +foreignKeyModelName, 'iD' +currentModelName],
      middleTablePK: {},
      middleTableRelatedFields: {},
      falseField: []
    }

    middleTableSchema.foreignKey['iD' +currentModelName] = {tableName:currentModelName}
    middleTableSchema.foreignKey['iD' +foreignKeyModelName] = {tableName:foreignKeyModelName}

    // console.log({ArgCurrentModelName, currentModelName, foreignKeyModelName, middleTableSchema})

    return middleTableSchema
  }


  generateGenericModel ({ModelName, middleTableSchema}) {

    class GenericModel extends  Model<GenericModel> {}

    const model = GenericModel

    GenericModel[RM.getModel] = () => {
      return model
    }

    GenericModel[RM.getTableSchema] = () => {
      return middleTableSchema
    }

    return GenericModel
  }

}


export const middleTable = new MiddleTable()
