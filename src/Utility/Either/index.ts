
export type Either<T, E> = { isOk: true; isError: false, value: T } | { isOk: false; isError: true, value: null, error: E };

export function ok<T, E>(value: T): Either<T, E> {
  return { isOk: true, isError: false, value };
}

export  function error<T, E>(error: E): Either<T, E> {
  return { isOk: false, isError: true, value:  null, error};
}
