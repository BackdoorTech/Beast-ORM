import { FieldsInText } from './FieldsInText.js';
export function getFields(ModelInstance) {
    const ColumnsAndType = FieldsInText.getFieldsAndType(ModelInstance.toString());
    return {};
}
