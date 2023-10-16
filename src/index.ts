import { Model } from './Presentation/Api.js'
import { fields } from './Presentation/Model/definitions.js'
import { ORM } from './BusinessLayer/beastOrm.js'
window["models"] = {
  Model,
  register: ORM.register,
  ...fields,
}
