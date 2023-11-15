import { Model } from "../../../Presentation/Api"
import { ForeignKey } from "../../../Presentation/Model/fields/allFields"
import { GustPrototype, RealPrototype } from "../../../Presentation/Model/fields/fieldsWrappers.js"
import { IRegister } from "../../beastOrm.type"
import { middleTable } from "./middleTable"


export class RelationShip {

  add(register:IRegister) {
    for(const model of register.models) {

      const tableSchema = model.getTableSchema()

      RealPrototype()
      const ExampleInstance = new model()
      GustPrototype()

      if(tableSchema.fieldTypes["ForeignKey"]) {
        for (const FieldName of tableSchema.fieldTypes["ForeignKey"]) {
          const foreignKeyField: ForeignKey  = ExampleInstance[FieldName]
          // this.addMethodForeignKey(foreignKeyField.model, FieldName, model)
        }
      }
    }
  }

  static addMethodForeignKey(foreignKeyModel:typeof Model<any>, foreignKeyFieldName:string, currentModel:typeof Model<any>) {

    // const { middleTableSchema, model } = middleTable.addMiddleTable(foreignKeyModel,foreignKeyFieldName, currentModel)

    // currentModel[foreignKeyFieldName+"add"] = async function () {

    //   const TableSchema = foreignKeyModel.getTableSchema()
    //   const obj = {}

    //   obj[TableSchema.id.keyPath] = this[FieldName]
    //   return foreignKeyFieldModel.filter(obj).execute()
    // }


    // foreignKeyModel['prototype'][FunctionName+'_setAll'] = async function () {

    //   const obj = {}
    //   obj[FieldName] = this.getPrimaryKeyValue()

    //   const currentModel: Model = models[modelName]

    //   return await currentModel.filter(obj).execute()

    // }

    // foreignKeyFieldModel['prototype'][FunctionName+'_setAdd'] = async function (arg) {
    //   const reporter = this
    //   arg[FieldName] = reporter
    //   return currentModel['create'](arg)
    // }


  }
}

export const relationShip = new RelationShip()
