import { PipeService } from "../Pattern/Pipe.js";
let EitherPipe = new PipeService();
export function registerPipe(f) {
    EitherPipe.register(f);
}
class OK {
    constructor(isOk, isError, value) {
        this.isOk = isOk;
        this.isError = isError;
        this.value = value;
    }
    runPipe({ createdDate }) {
        EitherPipe.execute({ createdDate, THIS: this });
        return this;
    }
}
class Error {
    constructor(isOk, isError, error, value) {
        this.isOk = isOk;
        this.isError = isError;
        this.error = error;
        this.value = value;
    }
    runPipe({ createdDate }) {
        EitherPipe.execute({ createdDate, THIS: this });
        return this;
    }
}
export function ok(value) {
    return new OK(true, false, value);
}
export function error(error) {
    return new Error(false, true, error, null);
}
