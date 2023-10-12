// query builder
//

export class Model {

  save() {}
  get() {}
  all() {}
  getOrCreate() {}
  create() {}
  createOrFind() {}
  updateOrCreate() {}
  update() {}

  static object = ({queryId, DBconfig, TableSchema,  some = null}) => {

    return {
      filter: (...args) => {
      },
      execute: async () => {},
      update: async(args) => {
      },
      delete: async() => {

      },
      all: async() => {
      }
    }
  }
}
