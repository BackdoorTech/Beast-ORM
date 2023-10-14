import { IRegister } from './beastOrm.type.js';
declare class BeastORM {
    private migrate;
    register(register: IRegister): void;
    executeQuery(): void;
    executeQueries(): void;
}
export declare const ORM: BeastORM;
export {};
