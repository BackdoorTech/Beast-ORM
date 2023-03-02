// postMessage("I\'m working before postMessage(\'ali\').");
import { DatabaseSchema, TableSchema } from '../models/register-modal.interface.js';
import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';

onmessage = async (oEvent) => {

  const { TableSchema, DBconfig, queryId, action, arg } = oEvent.data
  
  indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg).then((result) => {

    // console.log('result', result)
    // postMessage(result)

  }, (error) => {
    // console.log('error', error)
    // postMessage(error)

  })
}; 