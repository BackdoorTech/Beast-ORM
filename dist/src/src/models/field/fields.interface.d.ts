export declare const FieldKeysArray: readonly ["CharField", "JsonField", "AutoField", "BigIntegerField", "DateField", "IntegerField", "TextField", "BooleanField", "OneToOneField", "ForeignKey", "ManyToManyField", "indexedDBJsonField", "indexedDBArrayField", "DateTimeField", "DateField", "Unknown"];
export declare const AttributesArray: readonly ["maxLength", "minLength", "choices", "primaryKey", "unique", "autoIncrement", "type", "choices", "model", "blank", "default", "onDelete", "foreignKey"];
export declare type FieldKeys = typeof FieldKeysArray[number];
export declare type FieldsMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
export declare type FieldAttributesKeys = typeof AttributesArray[number];
export declare type AttributesMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
