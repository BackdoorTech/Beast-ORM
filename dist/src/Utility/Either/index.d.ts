export type Either<T, E> = {
    isOk: true;
    isError: false;
    value: T;
} | {
    isOk: false;
    isError: true;
    value: null;
    error: E;
};
export declare function ok<T, E>(value: T): Either<T, E>;
export declare function error<T, E>(error: E): Either<T, E>;
