import { DatabaseSchema, TableSchema } from "../../models/register-modal.interface"

export const models = {}
export const modelsConfig: {[key:string]: {
  DatabaseSchema:DatabaseSchema,
  TableSchema:TableSchema,
  OneToOneField?: {[key:string]: {}} 
}} = {}