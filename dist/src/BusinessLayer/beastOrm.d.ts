import { IRegister } from './beastOrm.type.js';
import { ICallBackReactiveList } from './_interface/interface.type.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js';
import { Model } from '../Presentation/Api';
import { FormValidationError } from './validation/fields/allFields.type.js';
import { Either } from '../Utility/Either/index.js';
import { TransactionAbortion } from '../DataAccess/_interface/interface.type.js';
declare class BeastORM {
    register: (register: IRegister) => void;
    private prepareMigrations;
    executeInsertionQuery<PModel>(QueryBuilder: QueryBuilder, Model: Object): Promise<Either<PModel, FormValidationError | TransactionAbortion>>;
    executeInsertionManyQuery<PModel>(QueryBuilder: QueryBuilder, Model: Object): Promise<Either<PModel, FormValidationError | TransactionAbortion>>;
    executeSelectQuery<PModel>(QueryBuilder: QueryBuilder, Model: Object): {
        one: () => Promise<Either<PModel, import("./queryBuilderHandler/queryErrorHandler.js").ItemNotFound>>;
        many: () => Promise<Either<PModel[], any>>;
        decide: () => Promise<Either<PModel, import("./queryBuilderHandler/queryErrorHandler.js").ItemNotFound>> | Promise<Either<PModel[], any>>;
    };
    executeUpdateQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<number, FormValidationError>>;
    deleteQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<number, FormValidationError>>;
    deleteQueryNoFormValidation(QueryBuilder: QueryBuilder, model: typeof Model): Promise<Either<number, FormValidationError>>;
    registerTrigger(_Model: typeof Model<any>, callBack: Function): {
        dispatchUID: string;
        disconnect: () => void;
    };
    ReactiveList<I>(_Model: typeof Model<any>, callBack: ICallBackReactiveList<I>): {
        readonly value: any[];
        readonly subscribe: {
            dispatchUID: string;
            disconnect: () => void;
        };
        unsubscribe: () => Promise<void>;
        setUpdateUi(func: any): void;
    };
}
export declare const ORM: BeastORM;
export {};
