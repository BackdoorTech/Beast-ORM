import { DatabaseSchema, TableSchema } from '../../models/register-modal.interface.js'

export const Databases: {[databaseName : string ]: DatabaseSchema} = {}
export const Tables: {[databaseName : string ]: {[table: string]: TableSchema} } = {}
