import { Model as ModelType } from '../Presentation/Api';
class CustomMethod {


  add(Model:typeof ModelType<any>, methodName: string, f:Function) {
    // Add a static method to the model for accessing the table schema.
    Model[methodName] = f

    Object.defineProperty(Model.prototype, methodName, f)
  }

  addStaticMethod(Model:typeof ModelType<any>, methodName: string, f:Function) {
    // Add a static method to the model for accessing the table schema.
    Model[methodName] = f
    // Object.defineProperty(Model.prototype, methodName, f)
  }
}


export const customMethod = new CustomMethod()
