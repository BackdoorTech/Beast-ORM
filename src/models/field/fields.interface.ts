import * as Fields from './fields.js'

export const FieldKeysArray = [
    'CharField',
    'JsonField',
] as const; // TS3.4 syntax


export const AttributesArray = [
    'maxLength',
    'minLength',
    'choices',
    'primaryKey'
] as const; // TS3.4 syntax

export type FieldKeys = typeof FieldKeysArray[number]; 
export type FieldsMap<K extends string | number | symbol, T> = { [P in K]?: T; };

export type AttributesKeys  = typeof AttributesArray[number];
export type AttributesMap<K extends string | number | symbol, T> = { [P in K]?: T; };

// https://stackoverflow.com/a/64694571/14115342
