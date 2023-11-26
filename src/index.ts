import { fields } from './Presentation/Model/definitions.js'
import { ORM } from './BusinessLayer/beastOrm.js'
import { getter } from './Presentation/Model/fields/fieldsWrappers.js'
import { Model, KeyValueModel } from './Presentation/Api.js'
import  { $B as $$B } from './Presentation/Api.js'
export { $B } from './Presentation/Api.js'
import { beastORMKeyValueStore } from './BusinessLayer/besatOrmKeyValueStore.js'

export const models = {
  $B: $$B,
  Model,
  KeyValueModel,
  register: ORM.register,
  registerKeyValueStore:  beastORMKeyValueStore.registerKeyValueStore,
  ...fields,
  ...getter
}

window["models"] = models
