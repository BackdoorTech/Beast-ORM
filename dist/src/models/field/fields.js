import { CharField as _CharField } from './char-field.js';
import { JsonField as _JsonField } from './json-field.js';
import { BooleanField as _BooleanField } from './boolean-field.js';
import { TextField as _TextField } from './text-field.js';
import { IntegerField as _IntegerField } from './integer-field.js';
import { DateField as _DateField } from './date-field.js';
import { BigIntegerField as _BigIntegerField } from './big-integer-field.js';
import { AutoField as _AutoField } from './auto-field.js';
import { IndDbJsonField as _IndDbJsonField } from './IndDb-json-field.js';
export function CharField(data) {
    return new _CharField(data);
}
export function JsonField() {
    return new _JsonField();
}
export function BooleanField() {
    return new _BooleanField();
}
export function TextField(data) {
    return new _TextField(data);
}
export function IntegerField(data) {
    return new _IntegerField(data);
}
export function DateField() {
    return new _DateField();
}
export function BigIntegerField() {
    return new _BigIntegerField();
}
export function AutoField(data) {
    return new _AutoField(data);
}
export function IndDbJsonField() {
    return new _IndDbJsonField();
}
