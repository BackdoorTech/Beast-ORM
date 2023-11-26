export function ok(value) {
    return { isOk: true, isError: false, value };
}
export function error(error) {
    return { isOk: false, isError: true, value: null, error };
}
