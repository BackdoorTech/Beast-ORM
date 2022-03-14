import * as Fields from './fields.js'

export const FieldKeysArray = [
    'CharField', 
    'JsonField',
    'AutoField',
    'BigIntegerField',
    'DateField',
    'IntegerField',
    'TextField',
    'BooleanField',
    'IndDbJsonField',
    'OneToOneField',
    'ForeignKey',
    'ManyToManyField'

] as const; // TS3.4 syntax


export const AttributesArray = [
    'maxLength',
    'minLength',
    'choices',
    'primaryKey',
    'unique',
    'autoIncrement',
    'type',
    'choices',
    'model',
    'blank',
    'default',
    'onDelete',
    'foreignKey'

] as const; // TS3.4 syntax

export type FieldKeys = typeof FieldKeysArray[number]; 
export type FieldsMap<K extends string | number | symbol, T> = { [P in K]?: T; };

export type FieldAttributesKeys  = typeof AttributesArray[number];
export type AttributesMap<K extends string | number | symbol, T> = { [P in K]?: T; };

// https://stackoverflow.com/a/64694571/14115342
