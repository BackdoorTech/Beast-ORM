export {};
// import { FieldsStrategyContext } from './fieldsWrappers.js'
// export function CharField(data?: CharFieldParams): string {
//   return FieldsStrategyContext.CharField(data) as any
// }
// export function BooleanField (data?:BooleanFieldParams): boolean {
// 	return FieldsStrategyContext.BooleanField(data) as any
// }
// export function TextField(data?: TextFieldParams): string {
// 	return FieldsStrategyContext.TextField(data) as any
// }
// export function IntegerField(data?:IntegerFieldParams): number {
// 	return FieldsStrategyContext.IntegerField(data) as any
// }
// export function DateField(data?:DateFieldParams): Date {
// 	return FieldsStrategyContext.DateField(data) as any
// }
// export function DateTimeField(data?:  DateTimeFieldParams): string {
// 	return FieldsStrategyContext.DateTimeField(data) as any
// }
// export function BigIntegerField(data?:BigIntegerFieldParams): number {
// 	return FieldsStrategyContext.BigIntegerField(data) as any
// }
// export function AutoField (data?: AutoFieldParams) {
// 	return FieldsStrategyContext.AutoField(data) as any
// }
// export const  indexedDB = {
// 	fields: {
// 		JsonField: (data?:IndexedDBJsonFieldParams): Object => FieldsStrategyContext.indexedDB.fields.JsonField(data) as any,
// 		ArrayField: (data?:IndexedDBArrayFieldParams): any[] => FieldsStrategyContext.indexedDB.fields.ArrayField(data) as any
// 	}
// }
// export  function OneToOneField<T>(data:OneToOneFieldParams<T>): OneToOneFieldResult<T> {
//   return FieldsStrategyContext.OneToOneField<T>(data)
// }
// export  function ForeignKey<T>(data:{
// 	model:  new () => T
// 	unique?: boolean
// 	blank?: boolean
// 	default?: any
// 	onDelete?: any
// 	primaryKey?:boolean
// }): ForeignKeyParamsResult<T>{
//   return FieldsStrategyContext.ForeignKey(data)
// }
// export  function ManyToManyField<T>(data?:{
// 	model:  new () => T
//   I: Model<any>
// 	unique?: boolean
// 	blank?: boolean
// 	default?: any
// 	onDelete?: any
// }): ManyToManyFieldParamsResult<T> {
//   return FieldsStrategyContext.ManyToManyField(data)
// }
// export const getter = {
//   ForeignKeyGetter<T>(data:{
//     model:  new () => T
//     I: Model<any>
//   }): ForeignKeyGetterParams<T> {
//     let modelInstance: T[]=  []
//     const foreignKeyModel: typeof Model<T> = data.model as any
//     const a =  {
//       async add(args:  Object) {
//         const currentModel = data.I.getModel()
//         const staticModel = foreignKeyModel.getModelSchema()
//         const tableSchema = foreignKeyModel.getTableSchema()
//         for(const fieldName of tableSchema.fieldTypes["ForeignKey"]) {
//           const Field: field = staticModel[fieldName]
//           if(equalModels(Field.model, currentModel)) {
//             const params = {}
//             params[fieldName] = data.I
//             const result = await foreignKeyModel.create<T>({...args, ...params})
//             return {...result, ...params}
//           }
//         }
//       },
//       async All() {
//         const currentModel = data.I.getModel()
//         const staticModel = foreignKeyModel.getModelSchema()
//         const tableSchema = foreignKeyModel.getTableSchema()
//         for(const fieldName of tableSchema.fieldTypes["ForeignKey"]) {
//           const Field: field = staticModel[fieldName]
//           if(equalModels(Field.model, currentModel)) {
//             const filter = getIdObjectWithT(data.I, data.I)
//             modelInstance = await Field.model.filter<T[]>(filter).execute()
//             return true
//           }
//         }
//       },
//       get list(): T[] {
//         return modelInstance
//       }
//     }
//     return  function () { return a }
//   },
//   ManyToManyFieldGetter<T>(data:{
//     model:  new () => T
//     I: Model<any>
//   }):ManyToManyGetterParams<T>{
//     let modelInstance: T[]=  []
//     const foreignKeyModel: typeof Model<T> = data.model as any
//     const a = {
//       add(args:  T) {
//         const currentModel = data.I.getModel()
//         const staticModel = currentModel.getModelSchema()
//         const tableSchema = currentModel.getTableSchema()
//         for(const [fieldName, info] of Object.entries(tableSchema.middleTablePK)) {
//           const Field: field = staticModel[fieldName]
//           if(equalModels(Field.model, foreignKeyModel)) {
//             return data.I[fieldName+RM.Add](args)
//           }
//         }
//       },
//       async all(): Promise<boolean> {
//         const currentModel = data.I.getModel()
//         const staticModel = currentModel.getModelSchema()
//         const tableSchema = currentModel.getTableSchema()
//         for(const [fieldName, info] of Object.entries(tableSchema.middleTablePK)) {
//           const Field: field = staticModel[fieldName]
//           if(equalModels(Field.model, foreignKeyModel)) {
//             modelInstance =  data.I[fieldName+RM.All]()
//             return true
//           }
//         }
//       },
//       get list(): T[] {
//         return modelInstance
//       }
//     }
//     return  function () { return a }
//   }
// }
