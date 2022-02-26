export declare const FieldKeysArray: readonly ["CharField", "JsonField"];
export declare const AttributesArray: readonly ["maxLength", "minLength", "choices", "primaryKey"];
export declare type FieldKeys = typeof FieldKeysArray[number];
export declare type FieldsMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
export declare type AttributesKeys = typeof AttributesArray[number];
export declare type AttributesMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
