import { CharField as _CharField } from './char-field.js';
import { JsonField as _JsonField } from './json-field.js';
export declare function CharField(data?: {
    maxLength?: number;
    minLength?: number;
}): _CharField;
export declare function JsonField(): _JsonField;
