import { ErrorCode } from "../../Utility/errorCode.js"

export class TransactionInfo {
  
  hasChangeDb = false
  operationNum = 0

  constructor() {}
}


export class TransactionAbortion extends Error {
  
  errorCode = ErrorCode.Transaction
  cause: ConstraintError

  constructor() {
    super()
  }

  setCause(cause: ConstraintError) {
    this.cause = cause
  }
}
export class ConstraintError {

  code = ErrorCode.UniquenessField
  message: string
  name: string

  constructor(data) {
    Object.assign(this, data)
  }

  tips() {}
}