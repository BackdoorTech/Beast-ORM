export type Either<T, E> = OK<T> | Error<E, T>;
export declare function registerPipe(f: Function): void;
declare class OK<T> {
    isOk: true;
    isError: false;
    value: T;
    constructor(isOk: true, isError: false, value: T);
    runPipe({ createdDate }: {
        createdDate: any;
    }): this;
}
declare class Error<E, T> {
    isOk: false;
    isError: true;
    error: E;
    value: T;
    constructor(isOk: false, isError: true, error: E, value: T);
    runPipe({ createdDate }: {
        createdDate: any;
    }): this;
}
export declare function ok<T, E>(value: T): OK<T>;
export declare function error<T, E>(error: E): Error<E, T>;
export {};
