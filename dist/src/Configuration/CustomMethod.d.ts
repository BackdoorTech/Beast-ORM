import { Model as ModelType } from '../Presentation/Api';
declare class CustomMethod {
    add(Model: typeof ModelType<any>, methodName: string, f: Function): void;
    addStaticMethod(Model: typeof ModelType<any>, methodName: string, f: Function): void;
}
export declare const customMethod: CustomMethod;
export {};
