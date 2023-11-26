import { PipeService } from "../Pattern/Pipe.js";

type Either<T, E> = { isOk: true; isError: false, value: T, pass():APIResponse<T, E> } | { isOk: false; isError: true, value: null, error: E, pass():APIResponse<T, E> };

type OK<T, E> = [T, Either<T, E> ]
type ERROR<T, E> = [T, Either<T, E>]

export type APIResponse<T, E> = OK<T, E> | ERROR<T, E>;

let EitherPipe: PipeService = new PipeService()

export function registerPipe(f:Function) {
  EitherPipe.register(f)
}

export function APIOk<T, E>(value: T): APIResponse<T, E> {

  const pass = (): APIResponse<T, E> => {
    return [value, {isOk: true, isError: false, value, pass}]
  }

  const object = {
    isOk: true,
    isError: false,
    value,
    pass
  }

  return [
    value,
    object as any
  ]
}

export  function APIError<T, E>(error: E): APIResponse<T, E> {

  const pass = (): APIResponse<T, E> => {
    return [null as T, {isOk: false, isError: true, value:  null, error, pass}]
  }

  const object = {
    isOk: false,
    isError: true,
    value:
    null, error,
    pass
  }
  return [
    null as T,
    object as any
  ]
}
