import { Model as ModelType } from '../Presentation/Api';
declare class CustomMethod {
    add(Model: typeof ModelType<any>, methodName: string, value: object): void;
    addStaticMethodNowrap(Model: typeof ModelType<any>, methodName: string, func: Function): void;
}
export declare const customMethod: CustomMethod;
export {};
