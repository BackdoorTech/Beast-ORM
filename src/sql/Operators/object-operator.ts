import * as operatorsObject from './operators.js'

export const operator = {
	gt:(field, arg, fieldValue, row) => {
		return operatorsObject.gt.validate(field, arg, fieldValue, row)
	},
	gte:(field, arg, fieldValue, row) => {
		return operatorsObject.gte.validate(field, arg, fieldValue, row)
	},
	lt:(field, arg, fieldValue, row) => {
		return operatorsObject.lt.validate(field, arg, fieldValue, row)
	},
	lte:(field, arg, fieldValue, row) => {
		return operatorsObject.lte.validate(field, arg, fieldValue, row)
	},
	not:(field, arg, fieldValue, row) => {
		return fieldValue != arg  
	},
	eq:(field, arg, fieldValue, row) => {
		return operatorsObject.eq.validate(field, arg, fieldValue, row)
	},
	contains:(field, arg, fieldValue, row) => {
		return operatorsObject.contains.validate(field, arg, fieldValue, row)
	},
	len(field, arg, fieldValue, row) {
		return operatorsObject.len.validate(field, arg, fieldValue, row)
	},
	hasKey(field, arg, fieldValue, row) {
		return operatorsObject.hasKey.validate(field, arg, fieldValue, row)
	},
	containedBy(field, arg, fieldValue, row) {
		return operatorsObject.containedBy.validate(field, arg, fieldValue, row)
	},
	overlap(field, arg, fieldValue, row) {
		return operatorsObject.overlap.validate(field, arg, fieldValue, row)
	},
	isNull(field, arg, fieldValue, row) {
		return operatorsObject.isNull.validate(field, arg, fieldValue, row)
	}
}

