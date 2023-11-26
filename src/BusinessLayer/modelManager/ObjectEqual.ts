class ObjectEqual {
  same(Model: any, data:Object) {

    return JSON.stringify(Model) == JSON.stringify(data)
  }
}


export const objectEqual = new ObjectEqual()
