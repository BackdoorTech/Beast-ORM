import { IndexedDBConnection } from './connector'
export class IndexedDBConnectionDynamicChange {
    changeSchema(db, schemaChanges) {
        db.close();
        const newDb = new IndexedDBConnection().connect({
            databaseName: 'databaseName',
            type: 'indexedDB',
            version: 0
        });
        
        
        // newDb.on('blocked', () => false); // Silence console warning of blocked event.
        // Workaround: If DB is empty from tables, it needs to be recreated
        // if (db.tables.length === 0) {
        //    await db.delete();
        //    newDb.version(1).stores(schemaChanges);
        //    return await newDb.open();
        //}
    
        // Extract current schema in dexie format:
        const currentSchema = db.tables.reduce((result, { name, schema }) => {
            result[name] = [ schema.primKey.src, ...schema.indexes.map((idx) => idx.src) ].join(',');
            return result;
        }, {});
    
        // console.log('Version: ' + db.verno);
        // console.log('Current Schema: ', currentSchema);
    
        // Tell Dexie about current schema:
        // newDb.version(db.verno).stores(currentSchema);
        // Tell Dexie about next schema:
        // newDb.version(db.verno + 1).stores(schemaChanges);
        // Upgrade it:
        // return await newDb.open();
    }
}
