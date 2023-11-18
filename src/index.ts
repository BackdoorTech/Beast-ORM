import { $B, Model } from './Presentation/Api.js'
import { fields } from './Presentation/Model/definitions.js'
import { ORM } from './BusinessLayer/beastOrm.js'
import { getter } from './Presentation/Model/fields/fieldsWrappers.js'

export { $B } from "./Presentation/Api.js"

export const models = {
  Model,
  $B,
  register: ORM.register,
  ...fields,
  ...getter
}
window["models"] = models
