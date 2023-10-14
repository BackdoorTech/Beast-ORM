export class field {
}
export var FieldType;
(function (FieldType) {
    FieldType[FieldType["AUTO"] = 0] = "AUTO";
    FieldType[FieldType["INT"] = 1] = "INT";
    FieldType[FieldType["BIGINT"] = 2] = "BIGINT";
    FieldType[FieldType["TEXT"] = 3] = "TEXT";
    FieldType[FieldType["VARCHAR"] = 4] = "VARCHAR";
    FieldType[FieldType["DATE"] = 5] = "DATE";
    FieldType[FieldType["BOOL"] = 6] = "BOOL";
    FieldType[FieldType["CHAR"] = 7] = "CHAR";
    FieldType[FieldType["JSON"] = 8] = "JSON";
    FieldType[FieldType["ARRAY"] = 9] = "ARRAY";
})(FieldType || (FieldType = {}));
export const FieldKeysArray = [
    'CharField',
    'JsonField',
    'AutoField',
    'BigIntegerField',
    'DateField',
    'IntegerField',
    'TextField',
    'BooleanField',
    'OneToOneField',
    'ForeignKey',
    'ManyToManyField',
    'indexedDBJsonField',
    'indexedDBArrayField',
    'DateTimeField',
    'DateField',
    'Unknown'
]; // TS3.4 syntax
export const AttributesArray = [
    'maxLength',
    'minLength',
    'choices',
    'primaryKey',
    'unique',
    'autoIncrement',
    'type',
    'choices',
    'model',
    'blank',
    'default',
    'onDelete',
    'foreignKey'
]; // TS3.4 syntax
