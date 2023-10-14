import { Model } from "../../Presentation/Api.js";
import { fields } from '../../Presentation/Model/definitions.js'
import { IDatabaseStrategy } from "../DriverAdapters/DriverAdapter.type.js";
import { IMigrations } from "./MakeMigration.type.js";

const { CharField, indexedDB }  = fields
class Migrations extends Model<Migrations> {
  databaseName =  CharField()
  migrations = indexedDB.fields.ArrayField({})
}

export class MakeMigrations {

  needToMigrate = false
  make(Migrations: IMigrations, Function: IDatabaseStrategy) {}
}
