export declare enum FieldType {
    AUTO = 0,
    INT = 1,
    BIGINT = 2,
    TEXT = 3,
    VARCHAR = 4,
    DATE = 5,
    BOOL = 6,
    CHAR = 7,
    JSON = 8,
    ARRAY = 9
}
export declare const FieldKeysArray: readonly ["CharField", "JsonField", "AutoField", "BigIntegerField", "DateField", "IntegerField", "TextField", "BooleanField", "OneToOneField", "ForeignKey", "ManyToManyField", "indexedDBJsonField", "indexedDBArrayField", "DateTimeField", "DateField", "Unknown"];
export declare const AttributesArray: readonly ["maxLength", "minLength", "choices", "primaryKey", "unique", "autoIncrement", "type", "choices", "model", "blank", "default", "onDelete", "foreignKey"];
export type FieldKeys = typeof FieldKeysArray[number];
export type FieldsMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
export type FieldAttributesKeys = typeof AttributesArray[number];
export type AttributesMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
