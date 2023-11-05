import { Model as ModelType } from '../Presentation/Api';
class CustomMethod {


  add(Model:typeof ModelType<any>, methodName: string, value:object) {
    // Add a static method to the model for accessing the table schema.


    Model[methodName] = function () {
      return value
    }

    Model.prototype[methodName] = function () {
      return value
    }

  }

  addStaticMethodNowrap(Model:typeof ModelType<any>, methodName: string, func:Function) {
    // Add a static method to the model for accessing the table schema.
    Model[methodName] =  func

    Model.prototype[methodName] = func
  }
}


export const customMethod = new CustomMethod()
