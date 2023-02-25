export class _ModelMigrations {
  
  callback: {[dbName: string]: Function[] } = {}
  migrated: {[dbName: string]: boolean} = {}

  prepare(databaseName) {
    this.callback[databaseName] = []
  }

  migrationsState(databaseName:string, value: boolean) {

    this.migrated[databaseName] = value

    if(this.migrated[databaseName]) {
      this.callback[databaseName].forEach((callback, index, object) => {
        callback()
      });
    }
  }
  isReady(modelClassRepresentation) {

    // const classInstance: typeof models.Model = new modelClassRepresentation()
  }

  async waitMigration(databaseName: string) {
    return new Promise((resolve, reject) => {
      if(!this.migrated[databaseName]) {
        this.callback[databaseName].push(() => {
          resolve('ready');
        })
      } else {
        resolve('ready');
      }
      
    }) 
  } 

}

export const ModelMigrations = new _ModelMigrations();