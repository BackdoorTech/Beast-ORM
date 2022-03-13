import { FieldType } from "../../sql/query/interface.js"
import { field } from "./field.js"

export class indexedDBArrayField extends field {

	type = FieldType.ARRAY
	
	constructor({type=null, size =null}) {
		super()
	}
}