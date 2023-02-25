import { DatabaseSchema } from "../../models/register-modal.interface";
import { DatabaseMemory } from './db.js'

export class MemoryConnector {
    constructor() {}

    private open() {}
    
    connect(config: DatabaseSchema): Promise<DatabaseMemory> {
      return new Promise<DatabaseMemory>((resolve, reject) => {
        const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;
        
        if (idbInstance) {
          const request: IDBOpenDBRequest = idbInstance.open(config.databaseName, config.version);
    
          request.onsuccess = () => {
            resolve( new DatabaseMemory() );
          };
    
          request.onerror = (e: any) => {
            reject(e.target.error.name);
          };
    
          request.onupgradeneeded = async (e: any) => {
            await this.migrate(config)
            return await this.connect(config)
          };
        } else {
          reject("IDBDatabase not supported inside webworker");
        }
      });
    }
  
    migrate(config: DatabaseSchema): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        const idbInstance = indexedDB || self.indexedDB || (self as any).mozIndexedDB || (self as any).webkitIndexedDB || (self as any).msIndexedDB;
        
        if (idbInstance) {
          const request: IDBOpenDBRequest = idbInstance.open(config.databaseName, config.version);
    
          request.onsuccess = () => {
            resolve(false);
          };
    
          request.onerror = (e: any) => {
            reject(e.target.error.name);
          };
    
          request.onupgradeneeded = async (e: any) => {
            const db:IDBDatabase = e.target.result;
            await this.runMigrations(db, config);
            db.close();
            resolve(true);
          };
  
        } else {
          reject("Failed to connect");
        }
      });
    }
  
    private async runMigrations(db:IDBDatabase, config: DatabaseSchema) {
      await config.stores.forEach( async (storeSchema) => {
        if (!db.objectStoreNames.contains(storeSchema.name)) {
          const ObjectStore = db.createObjectStore(storeSchema.name, storeSchema.id);
          storeSchema.fields.forEach(c => {
            ObjectStore.createIndex(c.name, c.keyPath, c.options);
          });
        }
      });
    }
}