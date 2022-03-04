import { DatabaseSchema } from './register-modal.interface.js';
export declare class Model {
    constructor(objData: any);
    filter(...arg: any[]): typeof Model & {
        filter: (a: any, b?: any, c?: any, d?: any) => typeof Model & any;
        select: () => void;
        execute(): void;
    };
    getId(): number;
    setDBConfig(config: DatabaseSchema): void;
    getDBSchema(): DatabaseSchema;
    static getDBSchema(): DatabaseSchema;
    static getId(): number;
    static setDBConfig(config: DatabaseSchema): void;
    static filter(...arg: any[]): typeof Model & {
        filter: (a: any, b?: any, c?: any, d?: any) => typeof Model & any;
        select: () => void;
        execute(): void;
    };
    /**
     * @param queryId
     * @param some is present when object is being called by that static and non static method
     * @returns all method that can be executed again on this class after executing one like
     */
    static object: (queryId: any, some?: any) => {
        filter: (a: any, b?: any, c?: any, d?: any) => typeof Model & any;
        select: () => void;
        execute(): void;
    };
}
