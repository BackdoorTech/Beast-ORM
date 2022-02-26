export declare class Model {
    constructor(objData: any);
    filter(...arg: any[]): typeof Model & {
        filter: (a: any, b?: any, c?: any, d?: any) => typeof Model & any;
        select: () => void;
        execute(): void;
    };
    static filter(...arg: any[]): typeof Model & {
        filter: (a: any, b?: any, c?: any, d?: any) => typeof Model & any;
        select: () => void;
        execute(): void;
    };
    static object: (queryId: any, some?: any) => {
        filter: (a: any, b?: any, c?: any, d?: any) => typeof Model & any;
        select: () => void;
        execute(): void;
    };
}
