import { IRegister } from './beastOrm.type.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js';
import { Model } from '../Presentation/Api';
import { Either } from '../Utility/Either/APIResponse.js';
import { FormValidationError } from './validation/fields/allFields.type.js';
declare class BeastORM {
    register: (register: IRegister) => void;
    private prepareMigrations;
    executeInsertionQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<PModel, FormValidationError>>;
    executeSelectQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<PModel, FormValidationError>>;
    executeUpdateQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<true | number, FormValidationError>>;
    deleteQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<true | number, FormValidationError>>;
    deleteQueryNoFormValidation(QueryBuilder: QueryBuilder, model: typeof Model): Promise<Either<true | number, FormValidationError>>;
    registerTrigger(_Model: typeof Model<any>, callBack: Function): {
        dispatchUID: string;
        disconnect: () => void;
    };
}
export declare const ORM: BeastORM;
export {};
