import { Model } from './Presentation/Api.js'
import { fields } from './Presentation/Model/definitions.js'
import { ORM } from './BusinessLayer/beastOrm.js'
import { getter } from './Presentation/Model/fields/fieldsWrappers.js'
window["models"] = {
  Model,
  register: ORM.register,
  ...fields,
  ...getter
}



// class Reporter extends Model<Reporter> {
//   firstName = fields.CharField({maxLength:30})
//   lastName = fields.CharField({maxLength:30})
//   email = fields.CharField()

//   //
//   articles= getter.ForeignKeyGetter({model: Article, I: this})
// }
// class Article extends Model<Article>  {
//   headline = fields.CharField({maxLength:100})
//   pubDate = fields.DateField()
//   reporter = fields.ForeignKey({model:Reporter})
// }

// ORM.register({
//   databaseName:'jest-test-11',
//   type: 'indexedDB',
//   version: 1,
//   models: [Reporter, Article]
// })


// const reporter = new Reporter()

// const  a = await reporter.articles().add({})


class Place extends Model<Place> {
  name = fields.CharField({maxLength: 50})
  address = fields.CharField({maxLength: 50})
}

class Restaurant extends Model<Restaurant>  {
  place = fields.OneToOneField({model:Place})
  servesHotDogs = fields.BooleanField({default: false})
  servesPizza = fields.BooleanField({default: false})
}


// ORM.register({
//   databaseName:'jest-test-10',
//   type: 'indexedDB',
//   version: 1,
//   models: [Place, Restaurant]
// })
