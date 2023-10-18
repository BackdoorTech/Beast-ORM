function ok(value) {
    return { kind: 'ok', value };
}
function error(error) {
    return { kind: 'error', error };
}
function divide(a, b) {
    if (b === 0) {
        return error("Division by zero is not allowed.");
    }
    return ok(a / b);
}
const result1 = divide(10, 2);
if (result1.kind === 'ok') {
    console.log('Result:', result1.value); // Output: Result: 5
}
else {
    console.error('Error:', result1.error);
}
const result2 = divide(10, 0);
if (result2.kind === 'ok') {
    console.log('Result:', result2.value);
}
else {
    console.error('Error:', result2.error); // Output: Error: Division by zero is not allowed.
}
