export class DatabaseOperations {
  db

  constructor(db) {
    this.db = db;
  }

  async insert(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([storeName], 'readwrite');
      const objectStore = tx.objectStore(storeName);
      const request = objectStore.add(data);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (error) => {
        reject(error);
      };
    });
  }
}
