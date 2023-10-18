import { IRegister } from './beastOrm.type.js';
declare class BeastORM {
    register(register: IRegister): void;
    private prepareMigrations;
    executeQuery(): void;
    executeQueries(): void;
}
export declare const ORM: BeastORM;
export {};
