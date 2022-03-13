import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, TextFieldParams } from './interface.js';
import * as Fields from './allFields.js';
export declare function CharField(data?: CharFieldParams): Fields.CharField;
export declare function BooleanField(data?: BooleanFieldParams): Fields.BooleanField;
export declare function TextField(data?: TextFieldParams): Fields.TextField;
export declare function IntegerField(data?: IntegerFieldParams): Fields.IntegerField;
export declare function DateField(data?: DateFieldParams): Fields.DateField;
export declare function BigIntegerField(data?: BigIntegerFieldParams): Fields.BigIntegerField;
export declare function AutoField(data?: AutoFieldParams): Fields.AutoField;
export declare const indexedDB: {
    fields: {
        JsonField: (data?: IndexedDBJsonFieldParams) => Fields.indexedDBJsonField;
        ArrayField: (data?: IndexedDBArrayFieldParams) => Fields.indexedDBArrayField;
    };
};
