import * as Fields from './allFields.js';
export function CharField(data) {
    return new Fields.CharField(data);
}
export function BooleanField(data) {
    return new Fields.BooleanField(data);
}
export function TextField(data) {
    return new Fields.TextField(data);
}
export function IntegerField(data) {
    return new Fields.IntegerField(data);
}
export function DateField(data) {
    return new Fields.DateField(data);
}
export function BigIntegerField(data) {
    return new Fields.BigIntegerField(data);
}
export function AutoField(data) {
    return new Fields.AutoField(data);
}
export const indexedDB = {
    fields: {
        JsonField: (data) => new Fields.indexedDBJsonField(data),
        ArrayField: (data) => new Fields.indexedDBArrayField(data)
    }
};
