import { Model } from "../../Presentation/Api.js";
import { CharField, indexedDB } from '../../Presentation/Model/definitions.js'
import { IDatabaseStrategy } from "../DriverAdapters/DriverAdapter.type.js";
import { IMigrations } from "./MakeMigration.type.js";
class Migrations extends Model<Migrations> {
  databaseName =  CharField()
  migrations = indexedDB.fields.ArrayField({})
}

export class MakeMigrations {

  needToMigrate = false
  make(Migrations: IMigrations, Function: IDatabaseStrategy) {}
}
