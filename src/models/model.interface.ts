import {Model} from './model.js'

export const MethodNameArray = [
    'save',
    'filter',
    'get',
    'create',
	'execute',
	'update',
	'delete',
	'all'
] as const; // TS3.4 syntax


export type MethodName = typeof MethodNameArray[number]; 
export interface  Method {
	methodName: MethodName,
	arguments: any
}
export type Methods = {[key: string]: Method [] }
export declare type getParams =  Object