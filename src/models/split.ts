import { Model } from "./model.js"

export const split = (name, model: Model) => {

    model['prototype']['getModelName'] = function()  {
      return name
    }
    model['getModelName'] = function()  {
      return name
    }
    return model
  }