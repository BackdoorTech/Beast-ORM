// postMessage("I\'m working before postMessage(\'ali\').");
import { DBSwitch } from './dbSwtich.js'
import { DatabaseSchema, TableSchema } from '../models/register-modal.interface.js';
import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';

onmessage = async (oEvent) => {

  const {TableSchema, DBconfig, queryId, action, arg} = oEvent.data

  const result = await  indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg)

  postMessage(result)
}; 