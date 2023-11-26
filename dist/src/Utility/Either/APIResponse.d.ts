type Either<T, E> = {
    isOk: true;
    isError: false;
    value: T;
    pass(): APIResponse<T, E>;
} | {
    isOk: false;
    isError: true;
    value: null;
    error: E;
    pass(): APIResponse<T, E>;
};
type OK<T, E> = [T, Either<T, E>];
type ERROR<T, E> = [T, Either<T, E>];
export type APIResponse<T, E> = OK<T, E> | ERROR<T, E>;
export declare function registerPipe(f: Function): void;
export declare function APIOk<T, E>(value: T): APIResponse<T, E>;
export declare function APIError<T, E>(error: E): APIResponse<T, E>;
export {};
