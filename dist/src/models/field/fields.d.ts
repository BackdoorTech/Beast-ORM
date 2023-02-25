import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, TextFieldParams } from './interface.js';
export declare function CharField(data?: CharFieldParams): any;
export declare function BooleanField(data?: BooleanFieldParams): any;
export declare function TextField(data?: TextFieldParams): any;
export declare function IntegerField(data?: IntegerFieldParams): any;
export declare function DateField(data?: DateFieldParams): any;
export declare function DateTimeField(data?: DateTimeFieldParams): any;
export declare function BigIntegerField(data?: BigIntegerFieldParams): any;
export declare function AutoField(data?: AutoFieldParams): any;
export declare const indexedDB: {
    fields: {
        JsonField: (data?: IndexedDBJsonFieldParams) => any;
        ArrayField: (data?: IndexedDBArrayFieldParams) => any;
    };
};
export declare function OneToOneField(data: OneToOneFieldParams): any;
export declare function ForeignKey(data: ForeignKeyParams): any;
export declare function ManyToManyField(data?: ManyToManyFieldParams): any;
