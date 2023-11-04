import { Either } from '../../../Utility/Either/index.js';
import { FormValidationError, field } from './allFields.type.js';
/**
 * Represents an AutoField, an automatically incrementing field for primary keys.
 */
export declare class AutoFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
/**
 * Represents a BigIntegerField, a field for storing large integer values.
 */
export declare class BigIntegerFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
/**
 * Represents a BooleanField, a field for storing boolean values.
 */
export declare class BooleanFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
/**
 * Represents a CharField, a field for storing text with a specified length.
 */
export declare class CharFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
export declare class DateFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
export declare class DateTimeFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
/**
 * Represents a CharField, a field for storing array.
 */
export declare class indexedDBArrayFieldBL extends field {
    size?: number;
    field: field;
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
/**
 * Represents a CharField, a field for storing json.
 */
export declare class indexedDBJsonFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
/**
 * Represents a CharField, a field for storing large text
 */
export declare class TextFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
/**
 * Represents a CharField, a field for storing integer
 */
export declare class IntegerFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
export declare class ForeignKeyBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
export declare class OneToOneFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
export declare class ManyToManyFieldBL extends field {
    constructor();
    valid(value: any): Either<true, FormValidationError>;
}
