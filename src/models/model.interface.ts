import {Model} from './model.js'

export const MethodNameArray = [
    'filter',
    'create'
] as const; // TS3.4 syntax


export type MethodName = typeof MethodNameArray[number]; 
export interface  Method {
	methodName: MethodName,
	arguments: any
}
export type Methods = {[key: string]: Method [] }