import { IRegister } from './beastOrm.type.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js';
import { Model, Model as ModelType } from '../Presentation/Api';
import { Either } from '../Utility/Either/index.js';
import { FormValidationError } from './validation/fields/allFields.type.js';
declare class BeastORM {
    register: (register: IRegister) => void;
    addMethods(Model: typeof ModelType<any>, functionName: any, value: any): void;
    addStaticMethodNowrap(Model: typeof ModelType<any>, functionName: any, value: Function): void;
    private prepareMigrations;
    executeInsertionQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<PModel, FormValidationError>>;
    deleteQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<PModel, FormValidationError>>;
    deleteQueryNoFormValidation(QueryBuilder: QueryBuilder, model: typeof Model): Promise<Either<true, FormValidationError>>;
    executeQueries(): void;
}
export declare const ORM: BeastORM;
export {};
