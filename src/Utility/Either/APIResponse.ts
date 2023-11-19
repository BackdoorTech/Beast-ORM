import { PipeService } from "../Pattern/Pipe.js";

export type Either<T, E> = OK<T> | Error<E, T>;
let EitherPipe: PipeService = new PipeService()

export function registerPipe(f:Function) {
  EitherPipe.register(f)
}

class OK<T> {
  constructor(
    public isOk: true,
    public isError: false,
    public value:T
  ) {}

  runPipe({createdDate}) {
    EitherPipe.execute({createdDate, THIS: this})
    return this
  }
}

class Error<E, T> {
  constructor(
    public isOk: false,
    public isError: true,
    public error: E,
    public value: T
  ) {}

  runPipe({createdDate}) {
    EitherPipe.execute({createdDate, THIS: this})
    return this
  }
}


export function ok<T, E>(value: T): OK<T> {
  return new OK<T>(true, false, value );
}

export  function error<T, E>(error: E): Error<E, T>{
  return new Error(false, true, error, null )
}
