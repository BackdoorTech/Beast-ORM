import { Model } from "../../Presentation/Api";
import { CharField, indexedDB } from '../../Presentation/Model/definitions'
class Migrations extends Model<Migrations> {
  databaseName =  CharField()
  migrations = indexedDB.fields.ArrayField({})
}

export class MakeMigrations {

}
