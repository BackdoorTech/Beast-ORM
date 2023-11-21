import { PipeService } from "../Pattern/Pipe.js";
let EitherPipe = new PipeService();
export function registerPipe(f) {
    EitherPipe.register(f);
}
export function APIOk(value) {
    const pass = () => {
        return [value, { isOk: true, isError: false, value, pass }];
    };
    const object = {
        isOk: true,
        isError: false,
        value,
        pass
    };
    return [
        value,
        object
    ];
}
export function APIError(error) {
    const pass = () => {
        return [null, { isOk: false, isError: true, value: null, error, pass }];
    };
    const object = {
        isOk: false,
        isError: true,
        value: null, error,
        pass
    };
    return [
        null,
        object
    ];
}
