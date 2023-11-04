import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, TextFieldParams } from '../../../BusinessLayer/fields/fieldsParameters.type.js';
export declare function CharField(data?: CharFieldParams): string;
export declare function BooleanField(data?: BooleanFieldParams): boolean;
export declare function TextField(data?: TextFieldParams): string;
export declare function IntegerField(data?: IntegerFieldParams): number;
export declare function DateField(data?: DateFieldParams): Date;
export declare function DateTimeField(data?: DateTimeFieldParams): string;
export declare function BigIntegerField(data?: BigIntegerFieldParams): number;
export declare function AutoField(data?: AutoFieldParams): any;
export declare const indexedDB: {
    fields: {
        JsonField: (data?: IndexedDBJsonFieldParams) => Object;
        ArrayField: (data?: IndexedDBArrayFieldParams) => any[];
    };
};
export declare function OneToOneField(data: OneToOneFieldParams): string | number;
export declare function ForeignKey(data: ForeignKeyParams): string | number;
export declare function ManyToManyField(data?: ManyToManyFieldParams): string | number;
