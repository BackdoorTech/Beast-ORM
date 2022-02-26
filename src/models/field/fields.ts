import {CharField as _CharField} from './char-field.js'


export function CharField(data?: { maxLength?: number; minLength?: number }) {
    return new _CharField(data)
};
