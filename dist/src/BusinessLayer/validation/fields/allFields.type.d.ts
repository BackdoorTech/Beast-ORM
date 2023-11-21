import { Model } from "../../../Presentation/Api.js";
import { Either } from "../../../Utility/Either/index.js";
import { InvalidType, InvalidValue } from "../../error/class/validation.js";
import { FieldKeys } from "../../fields/fields.type";
declare class maxLengthError extends Error {
}
declare class minLengthError extends Error {
}
export declare class sizeError extends Error {
}
export declare class field {
    fieldName: FieldKeys;
    primaryKey?: any;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    choices?: any[] | undefined;
    type: number;
    blank: boolean;
    default?: any;
    unique?: boolean;
    foreignKey?: boolean;
    model?: typeof Model<any>;
    isNull(value: any): boolean;
    rules(field: field, value: any): EitherResultRule;
    valid(e: any): Either<true, FormValidationError>;
}
type EitherResultRule = Either<true, maxLengthError | minLengthError>;
export type FormValidationError = InvalidType | InvalidValue | maxLengthError | minLengthError;
export type EitherFormValidationError = Either<true, FormValidationError>;
export {};
