import { IRegister } from './beastOrm.type.js';
import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js';
import { Model } from '../Presentation/Api';
import { Model as ModelType } from '../Presentation/Api';
declare class BeastORM {
    register: (register: IRegister) => void;
    addMethods(Model: typeof ModelType<any>): void;
    private prepareMigrations;
    executeQuery(QueryBuilder: QueryBuilder, Model: Model<any>): Promise<any>;
    executeQueries(): void;
}
export declare const ORM: BeastORM;
export {};
