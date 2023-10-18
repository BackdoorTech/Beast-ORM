
type Either<T, E> = { kind: 'ok'; value: T } | { kind: 'error'; error: E };

function ok<T, E>(value: T): Either<T, E> {
  return { kind: 'ok', value };
}

function error<T, E>(error: E): Either<T, E> {
  return { kind: 'error', error };
}


function divide(a: number, b: number): Either<number, string> {
  if (b === 0) {
    return error("Division by zero is not allowed.");
  }
  return ok(a / b);
}

const result1 = divide(10, 2);
if (result1.kind === 'ok') {
  console.log('Result:', result1.value); // Output: Result: 5
} else {
  console.error('Error:', result1.error);
}

const result2 = divide(10, 0);
if (result2.kind === 'ok') {
  console.log('Result:', result2.value);
} else {
  console.error('Error:', result2.error); // Output: Error: Division by zero is not allowed.
}
