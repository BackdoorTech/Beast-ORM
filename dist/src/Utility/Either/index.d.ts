type Either<T, E> = {
    kind: 'ok';
    value: T;
} | {
    kind: 'error';
    error: E;
};
declare function ok<T, E>(value: T): Either<T, E>;
declare function error<T, E>(error: E): Either<T, E>;
declare function divide(a: number, b: number): Either<number, string>;
declare const result1: Either<number, string>;
declare const result2: Either<number, string>;
