import { Either, error, ok } from '../../../Utility/Either/index.js'
import { InvalidType, InvalidValue } from '../../error/class/validation.js'
import { FormValidationError, field, sizeError } from './allFields.type.js'


function isString(value): Either<true, InvalidType> {
  if(typeof value != 'string') {
    if(this.blank && value != null) return error(new InvalidValue())
  }
  return ok(true)
}

function isNumber (value): Either<true, InvalidType> {
  if(!(typeof value == 'bigint' || typeof value == 'number')) {
    if(this.blank && value != null) return error(new InvalidValue())
  }

  return ok(true)
}

/**
 * Represents an AutoField, an automatically incrementing field for primary keys.
 */
export class AutoFieldBL  extends field{

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {
    const result = isNumber(value)
    if(result.isError) {
      return result
    }

		return ok(true)
  }
}

/**
 * Represents a BigIntegerField, a field for storing large integer values.
 */
export class BigIntegerFieldBL extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {
    const result = isNumber(value)
    if(result.isError) {
      return result
    }

    const validation = this.rules(this, value)
    if (validation.isError) return validation

		return ok(true)
  }
}

/**
 * Represents a BooleanField, a field for storing boolean values.
 */
export class BooleanFieldBL extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {

		if( typeof value != 'boolean') return error(new InvalidType())

		return ok(true)
	}
}

/**
 * Represents a CharField, a field for storing text with a specified length.
 */
export class CharFieldBL extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {

    const result = isString(value)
    if(result.isError) {
      return result
    }

    const validation = this.rules(this, value)
    if (validation.isError) return validation

		return ok(true)

	}

}


export class DateFieldBL extends field{

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {

    const result = isString(value)
    if(result.isError) {
      return result
    }

    const validation = this.rules(this, value)
    if (validation.isError) return validation

		return ok(true)

	}

}

export class DateTimeFieldBL  extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {

    const result = isString(value)
    if(result.isError) {
      return result
    }

    const validation = this.rules(this, value)
    if (validation.isError) return validation

		return ok(true)

	}

}
/**
 * Represents a CharField, a field for storing array.
 */
export class indexedDBArrayFieldBL extends field  {

  size?: number
  field: field

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {

		if( !(Array.isArray(value))) {
			if(this.blank && this.isNull(value) == true) return ok(true)
		}

    if(this.size) {
			if(value.length != this.size) {
				return error(new sizeError())
			}
		}

		for(const e of value) {
      if(!this.field.valid(e)) {
        return error(new sizeError())
      }
    }

		return ok(true)
	}

}
/**
 * Represents a CharField, a field for storing json.
 */
export class indexedDBJsonFieldBL extends field {

	constructor() { super() }

  	valid(value): Either<true, FormValidationError> {

		if(!(typeof value == 'object' && Array.isArray(value) == false)) {
			if(this.blank && value != null) return error(new InvalidType())
		}

		return ok(true)
	}

}

/**
 * Represents a CharField, a field for storing large text
 */
export class TextFieldBL  extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {

    const result = isString(value)
    if(result.isError) {
      return result
    }

    const validation = this.rules(this, value)
    if (validation.isError) return validation

		return ok(true)

	}

}

/**
 * Represents a CharField, a field for storing integer
 */
export class IntegerFieldBL extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {
    const result = isNumber(value)
    if(result.isError) {
      return result
    }

    const validation = this.rules(this, value)
    if (validation.isError) return validation

		return ok(true)
  }
}

export class ForeignKeyBL extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {
    const validation = this.rules(this, value)
    if (validation.isError) return validation
	}

}

export class OneToOneFieldBL extends field {

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {
    const validation = this.rules(this, value)
    if (validation.isError) return validation
	}

}

export class ManyToManyFieldBL extends field{

	constructor() { super() }

  valid(value): Either<true, FormValidationError> {
    const validation = this.rules(this, value)
    if (validation.isError) return validation
	}
}
