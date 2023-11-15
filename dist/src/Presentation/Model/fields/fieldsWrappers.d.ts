import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyGetterParams, ForeignKeyParamsResult, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParamsResult, OneToOneFieldParams, OneToOneFieldResult, TextFieldParams } from '../../../BusinessLayer/fields/fieldsParameters.type.js';
import { Model } from '../../Api.js';
export declare function GustPrototype(): void;
export declare function RealPrototype(): void;
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
export declare function OneToOneField<T>(data: OneToOneFieldParams<T>): OneToOneFieldResult<T>;
export declare function ForeignKey<T>(data: {
    model: new () => T;
    unique?: boolean;
    blank?: boolean;
    default?: any;
    onDelete?: any;
    primaryKey?: boolean;
}): ForeignKeyParamsResult<T>;
export declare function ManyToManyField<T>(data?: {
    model: new () => T;
    I: Model<any>;
    unique?: boolean;
    blank?: boolean;
    default?: any;
    onDelete?: any;
}): ManyToManyFieldParamsResult<T>;
export declare const getter: {
    ForeignKeyGetter<T>(data: {
        model: new () => T;
        I: Model<any>;
    }): ForeignKeyGetterParams<T>;
};
