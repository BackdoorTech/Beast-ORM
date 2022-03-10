import { DatabaseSchema, TableSchema } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
export declare class Model extends ModelManager {
    BeastOrmId: any;
    constructor(objData: any);
    filter(...arg: any[]): typeof Model & {
        filter: (a: any, b?: any, c?: any, d?: any) => typeof Model & any;
        select: () => void;
        execute(): void;
    };
    create(arg: any): Promise<any>;
    getId(): number;
    setDBConfig(config: DatabaseSchema): void;
    getDBSchema(): DatabaseSchema;
    getModelName(): any;
    getTableSchema(): TableSchema;
    static getId(): number;
    static setDBConfig(config: DatabaseSchema): void;
    static create(arg: any): Promise<any>;
    static getDBSchema(): DatabaseSchema;
    static getTableSchema(): TableSchema;
    static getModelName(): string;
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
