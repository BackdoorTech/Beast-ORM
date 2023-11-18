import * as Fields from './allFields.js'
import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyGetterParams, ForeignKeyParams, ForeignKeyParamsResult, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, ManyToManyFieldParamsResult, ManyToManyGetterParams, OneToOneFieldParams, OneToOneFieldResult, TextFieldParams } from '../../../BusinessLayer/fields/fieldsParameters.type.js'
import { Model } from '../../Api.js'
import { field } from '../../../BusinessLayer/validation/fields/allFields.type.js'
import { equalModels, getIdObjectWithT } from '../../../Utility/Model/utils.js'
import { RuntimeMethods as RM } from '../../../BusinessLayer/modelManager/runtimeMethods/runTimeMethods.js'
import { modelRegistration } from '../../../BusinessLayer/modelManager/register/register.js'
import { relationShip } from '../../../BusinessLayer/modelManager/relationships/relationShip.js'

const PrototypeGust =  {
  CharField(data?: CharFieldParams): string {return null as any },
  BooleanField (data?:BooleanFieldParams): boolean {return null as any },
  TextField(data?: TextFieldParams): string {return null as any },
  IntegerField(data?:IntegerFieldParams): number {return null as any },
  DateField(data?:DateFieldParams): Date {return null as any },
  DateTimeField(data?:  DateTimeFieldParams): string {return null as any },
  BigIntegerField(data?:BigIntegerFieldParams): number {return null as any },
  AutoField (data?: AutoFieldParams) {return null as any },
  indexedDB: {
    fields: {
      JsonField: (data?:IndexedDBJsonFieldParams): Object => null as any,
      ArrayField: (data?:IndexedDBArrayFieldParams): any[] => null as any
    }
  },
  OneToOneField: <T>(data:{
    model: new () => T
    unique?: boolean
    blank?: boolean
    default?: any
    onDelete?: any
  }): OneToOneFieldResult<T> => {

    const modelInstance = new (data.model as any)()

    return modelInstance

  },
  ForeignKey<T>(data:{
    model:  new () => T
    I: Model<any>
    unique?: boolean
    blank?: boolean
    default?: any
    onDelete?: any
    primaryKey?:boolean
  }): ForeignKeyGetterParams<T> {
    return new (data.model as any)()
  },
  ManyToManyField<T>(data?:{
    model:  new () => T
    I: Model<any>
    unique?: boolean
    blank?: boolean
    default?: any
    onDelete?: any
  }) {
    let modelInstance: T[]=  []
    const foreignKeyModel: typeof Model<T> = data.model as any

    return {
      async add(args:  T) {

        const currentModel = data.I.getModel()

        const middleTableName = relationShip.getMiddleTableName(currentModel, foreignKeyModel)

        const { fieldName } = currentModel.getTableSchema().middleTableRelatedFields[middleTableName]

        return data.I[fieldName+RM.Add](args)

      },
      async all() {
        const currentModel = data.I.getModel()

        const middleTableName = relationShip.getMiddleTableName(currentModel, foreignKeyModel)

        const { fieldName } = currentModel.getTableSchema().middleTableRelatedFields[middleTableName]

        modelInstance =  await data.I[fieldName+RM.All]()
        return true
      },
      get list(): T[] {
        return modelInstance
      }
    }
  },
}

export const _RealPrototype =  {
  CharField(data?: CharFieldParams): string {
    return new Fields.CharField(data) as any
  },
  BooleanField (data?:BooleanFieldParams): boolean {
    return new Fields.BooleanField(data) as any
  },
  TextField(data?: TextFieldParams): string {
    return new Fields.TextField(data) as any
  },
  IntegerField(data?:IntegerFieldParams): number {
    return new Fields.IntegerField(data) as any
  },
  DateField(data?:DateFieldParams): Date {
    return new Fields.DateField(data) as any
  },
  DateTimeField(data?:  DateTimeFieldParams): string {
    return new Fields.DateTimeField(data) as any
  },
  BigIntegerField(data?:BigIntegerFieldParams): number {
    return new Fields.BigIntegerField(data) as any
  },
  AutoField (data?: AutoFieldParams) {
    return new Fields.AutoField(data) as any
  },
  indexedDB: {
    fields: {
      JsonField: (data?:IndexedDBJsonFieldParams): Object => new Fields.indexedDBJsonField(data) as any,
      ArrayField: (data?:IndexedDBArrayFieldParams): any[] => new Fields.indexedDBArrayField(data) as any
    }
  },
  OneToOneField: <T>(data: OneToOneFieldParams<T>) => new Fields.OneToOneField(data) as any,
  ForeignKey: (data: ForeignKeyParams) => new Fields.ForeignKey(data) as any,
  ManyToManyField: (data:ManyToManyFieldParams) => new Fields.ManyToManyField(data) as any,
}

let FieldsStrategyContext = _RealPrototype

export function GustPrototype() {
  FieldsStrategyContext = PrototypeGust
}
export function RealPrototype() {
  FieldsStrategyContext = _RealPrototype
}

export function CharField(data?: CharFieldParams): string {
  return FieldsStrategyContext.CharField(data) as any
}

export function BooleanField (data?:BooleanFieldParams): boolean {
	return FieldsStrategyContext.BooleanField(data) as any
}

export function TextField(data?: TextFieldParams): string {
	return FieldsStrategyContext.TextField(data) as any
}

export function IntegerField(data?:IntegerFieldParams): number {
	return FieldsStrategyContext.IntegerField(data) as any
}

export function DateField(data?:DateFieldParams): Date {
	return FieldsStrategyContext.DateField(data) as any
}

export function DateTimeField(data?:  DateTimeFieldParams): string {
	return FieldsStrategyContext.DateTimeField(data) as any
}
export function BigIntegerField(data?:BigIntegerFieldParams): number {
	return FieldsStrategyContext.BigIntegerField(data) as any
}

export function AutoField (data?: AutoFieldParams) {
	return FieldsStrategyContext.AutoField(data) as any
}


export const  indexedDB = {
	fields: {
		JsonField: (data?:IndexedDBJsonFieldParams): Object => FieldsStrategyContext.indexedDB.fields.JsonField(data) as any,
		ArrayField: (data?:IndexedDBArrayFieldParams): any[] => FieldsStrategyContext.indexedDB.fields.ArrayField(data) as any
	}
}



export  function OneToOneField<T>(data:OneToOneFieldParams<T>): OneToOneFieldResult<T> {
  return FieldsStrategyContext.OneToOneField<T>(data)
}

export  function ForeignKey<T>(data:{
	model:  new () => T
	unique?: boolean
	blank?: boolean
	default?: any
	onDelete?: any
	primaryKey?:boolean
}): ForeignKeyParamsResult<T>{
  return FieldsStrategyContext.ForeignKey(data)
}


export  function ManyToManyField<T>(data?:{
	model:  new () => T
  I: Model<any>
	unique?: boolean
	blank?: boolean
	default?: any
	onDelete?: any
}): ManyToManyFieldParamsResult<T> {
  return FieldsStrategyContext.ManyToManyField(data)
}





export const getter = {
  ForeignKeyGetter<T>(data:{
    model:  new () => T
    I: Model<any>
  }): ForeignKeyGetterParams<T> {

    let modelInstance: T[]=  []
    const foreignKeyModel: typeof Model<T> = data.model as any

    const a =  {
      async add(args:  Object) {
        const currentModel = data.I.getModel()

        const staticModel = foreignKeyModel.getModelSchema()
        const tableSchema = foreignKeyModel.getTableSchema()

        for(const fieldName of tableSchema.fieldTypes["ForeignKey"]) {
          const Field: field = staticModel[fieldName]
          if(equalModels(Field.model, currentModel)) {
            const params = {}
            params[fieldName] = data.I

            const result = await foreignKeyModel.create<T>({...args, ...params})

            return {...result, ...params}
          }
        }
      },
      async All() {
        const currentModel = data.I.getModel()
        const staticModel = foreignKeyModel.getModelSchema()
        const tableSchema = foreignKeyModel.getTableSchema()

        for(const fieldName of tableSchema.fieldTypes["ForeignKey"]) {
          const Field: field = staticModel[fieldName]
          if(equalModels(Field.model, currentModel)) {
            const filter = getIdObjectWithT(data.I, data.I)
            modelInstance = await Field.model.filter<T[]>(filter).execute()
            return true
          }
        }
      },
      get list(): T[] {
        return modelInstance
      }
    }

    return  function () { return a }
  },
  ManyToManyGetter<T>(data:{
    model:  new () => T
    I: Model<any>
  }):ManyToManyGetterParams<T>{
    let modelInstance: T[]=  []
    const foreignKeyModel: typeof Model<T> = data.model as any

    const a = {
      add(args:  T) {

        const currentModel = data.I.getModel()

        const middleModel = relationShip.getMiddleTable(foreignKeyModel, currentModel)

        return relationShip.addToMiddleTable<T>(data.I, foreignKeyModel, args as Model<any>, middleModel)

      },
      async all(): Promise<boolean> {
        const currentModel = data.I.getModel()

        const middleModel = relationShip.getMiddleTable(foreignKeyModel, currentModel)

        modelInstance =  await relationShip.getAll<T>(data.I, foreignKeyModel, middleModel)

        return true
      },
      get list(): T[] {
        return modelInstance
      }
    }

    return  function () { return a }
  }
}
