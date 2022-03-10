import { FieldType } from "../../sql/query/interface.js"
import { field } from "./field.js"

export class IndDbJsonField extends field {


	type = FieldType.JSON
	
	constructor() {
		super()
	}
}