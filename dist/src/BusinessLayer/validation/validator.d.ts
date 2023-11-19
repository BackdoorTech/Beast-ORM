import { ITableSchema } from '../_interface/interface.type';
import { Either } from '../../Utility/Either/APIResponse.js';
import { ValidationError } from './error/ValidationError.js';
import { Model as ModelType } from '../../Presentation/Api';
import { FormValidationError } from './fields/allFields.type';
declare class Validator {
    validateFromSchema(tableSchema: ITableSchema, data: Object): Either<true, ValidationError>;
    requiredFields(tableSchema: ITableSchema): string[];
    ModelValidator(Model: typeof ModelType<any>, tableSchema: ITableSchema): (value: any) => FormValidationError;
}
export declare const validator: Validator;
export {};
