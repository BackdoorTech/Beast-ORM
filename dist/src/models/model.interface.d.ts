export declare const MethodNameArray: readonly ["filter", "create"];
export declare type MethodName = typeof MethodNameArray[number];
export interface Method {
    methodName: MethodName;
    arguments: any;
}
export declare type Methods = {
    [key: string]: Method[];
};
