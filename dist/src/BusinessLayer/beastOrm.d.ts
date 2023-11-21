import { IRegister } from './beastOrm.type.js';
import { ICallBackReactiveList } from './_interface/interface.type.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js';
import { Model } from '../Presentation/Api';
import { Either } from '../Utility/Either/APIResponse.js';
import { FormValidationError } from './validation/fields/allFields.type.js';
import { ItemNotFound } from './queryBuilderHandler/queryErrorHandler.js';
declare class BeastORM {
    register: (register: IRegister) => void;
    private prepareMigrations;
    executeInsertionQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<PModel, FormValidationError>>;
    executeSelectQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): {
        one: () => Promise<import("../Utility/Either/index.js").Either<PModel, ItemNotFound>>;
        many: () => Promise<import("../Utility/Either/index.js").Either<PModel[], any>>;
    };
    executeUpdateQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<number, FormValidationError>>;
    deleteQuery<PModel>(QueryBuilder: QueryBuilder, Model: PModel): Promise<Either<number, FormValidationError>>;
    deleteQueryNoFormValidation(QueryBuilder: QueryBuilder, model: typeof Model): Promise<Either<number, FormValidationError>>;
    registerTrigger(_Model: typeof Model<any>, callBack: Function): {
        dispatchUID: string;
        disconnect: () => void;
    };
    ReactiveList(_Model: typeof Model<any>, callBack: ICallBackReactiveList): {
        readonly value: any;
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
