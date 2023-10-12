export declare const MethodNameArray: readonly ["save", "filter", "get", "create", "execute", "update", "delete", "all", "first"];
export declare type MethodName = typeof MethodNameArray[number];
export interface Method {
    methodName: MethodName;
    arguments: any;
}
export declare type Methods = {
    [key: string]: Method[];
};
export declare type getParams = Object;
