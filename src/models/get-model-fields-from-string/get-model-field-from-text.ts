import {FieldsInText} from './FieldsInText.js'
import { transTypeToObject } from './transform-type-to-object.js'


export function getFields(ModelInstance) {

  const ColumnsAndType = FieldsInText.getFieldsAndType(ModelInstance.toString())

  return {}
}