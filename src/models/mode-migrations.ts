export class _ModelMigrations {
  
  callback = []

  private isMigrationsReady = false
  migrationsState(value: boolean) {

    this.isMigrationsReady = value;
    if(this.isMigrationsReady) {
      this.callback.forEach((item, index, object) => {
        item()
        object.splice(index, 1);
      });
    }


  }
  isReady(modelClassRepresentation) {

    // const classInstance: typeof models.Model = new modelClassRepresentation()
  }

  async waitMigration() {
    return new Promise((resolve, reject) => {
      if(!this.isMigrationsReady) {
        this.callback.push(() => {
          resolve('ready');
        })
      } else {
        resolve('ready');
      }
      
    }) 
  } 

}

export const ModelMigrations = new _ModelMigrations();