import { Model } from "../../Presentation/Api"
import { field } from "../validation/fields/allFields.type"

export interface CharFieldParams {
	maxLength?: number
	minLength?: number
	primaryKey?:boolean
	choices?: any[] | undefined
	unique?: boolean
	blank?: boolean
	default?: any
}

export interface TextFieldParams {
	maxLength?: number
	minLength?: number
	primaryKey?:boolean
	unique?: boolean
	default?: any
	blank?: boolean
}

export interface IntegerFieldParams {
	primaryKey?:boolean
	unique?: boolean
	default?: any
	blank?: boolean
}

export interface BigIntegerFieldParams {
	primaryKey?:boolean
	unique?: boolean
	default?: any
	blank?: boolean
}

export interface AutoFieldParams {
	primaryKey?:boolean
}


export interface IndexedDBJsonFieldParams {
	unique?: boolean
	blank?: boolean
	null?: boolean
	default?: any
}


export interface IndexedDBArrayFieldParams {
	unique?: boolean
	blank?: boolean
	type?: any
	default?: any
	maxLength?: number
	minLength?: number
	field?: field | any
	size?: number
}


export interface DateTimeFieldParams {
	unique?: boolean
	blank?: boolean
	default?: any
}


export interface DateFieldParams {
	unique?: boolean
	blank?: boolean
	default?: any
}


export interface BooleanFieldParams {
	unique?: boolean
	blank?: boolean
	default?: any
}

export interface ForeignKeyParams {
	model: any
	unique?: boolean
	blank?: boolean
	default?: any
	onDelete?: any
	primaryKey?:boolean
}

export interface ForeignKeyParamsResult<T> {
  object: T;
}

// export interface ForeignKeyGetterParams<T> {
//   add(args: T ): Promise<T>;
//   All(): Promise<boolean>;
//   readonly list: T[];
// }


export type ForeignKeyGetterParams<T>  = () => {
  add(args: Object): Promise<T>;
  All(): Promise<boolean>;
  readonly list: T[];
}


export interface OneToOneFieldParams<T>  {
  model: new () => T;
  unique?: boolean;
  blank?: boolean;
  default?: any;
  onDelete?: any;
}
export interface OneToOneFieldResult<T> {
  object: T;
}
interface OneToOneFieldFunction {
  <T>(data: OneToOneFieldParams<T>): OneToOneFieldResult<T>;
}



export interface ManyToManyFieldParams {
	model: any
  I: Model<any>
	unique?: boolean
	blank?: boolean
	default?: any
	onDelete?: any
}

export interface ManyToManyFieldParamsResult<T> {
  addMany(args: T[]): Promise<T[]>;
  add(args: T ): Promise<T>;
  All(): Promise<T[]>;
  readonly list: T[];
}

export interface PossibleFieldAttributes {
	model?: any
	unique?: boolean
	blank?: boolean
	default?: any
	onDelete?: any
	primaryKey?:boolean
	maxLength?: number
	minLength?: number
	choices?: any[] | undefined
}
