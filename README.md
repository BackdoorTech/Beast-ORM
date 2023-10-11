# Beast ORM

Beast ORM is a powerful Object-Relational Mapping (ORM) library designed for working with IndexedDB and LocalStorage in web applications. If you're familiar with Django ORM, you'll find Beast ORM to be a similar tool for managing your data storage needs in a browser-based environment. <br>
Offline first with beast-orm made easy.


## DBMS Support

- IndexedDB
- Sqlite **(Will be publish in version 2.0.0)**
- localstorage 

<br/>

# Features
- **IndexedDB Support**: Beast ORM provides a high-level API for working with IndexedDB, allowing you to create, retrieve, update, and delete objects in an offline-first manner.

- **LocalStorage Support**: You can also use Beast ORM to interact with LocalStorage, making it a versatile solution for managing client-side data storage.

- **Model Definitions**: Define your data models in a class-based format, similar to Django models. Define fields, set primary keys, and manage relationships effortlessly.

- **Transactions**: Beast ORM handles IndexedDB transactions efficiently, ensuring data consistency and reliability. It can run multiple requests within a single transaction and includes a built-in transaction error handler.

- **Querying**: Use Beast ORM's query API to filter and retrieve objects from your data models with ease. You can filter, sort, and apply complex lookup parameters to your queries.

- **ArrayField**: Store lists of data using the ArrayField, which supports nested arrays and provides various lookup options for querying array contents.

- **JSONField**: Store JSON data and perform queries on JSON objects. Beast ORM supports key, index, and path transforms for querying JSON data effectively.

- **Many-to-Many, One-to-One, and Many-to-One Relationship**s: Define relationships between your models, such as many-to-many, one-to-one, and many-to-one. Access related objects easily.

- **Reactive List**: Create reactive data lists that automatically update when a transaction is about to close, making it easy to synchronize your views with the database.

#### A promise base api implementation for accessing indexedDB 
## Create model

Start by defining your data models using the class-based syntax. Here's an example of a User model:

```javascript
import { models } from 'beast-orm';

class User extends models.Model {

  userId = models.AutoField({primaryKey:true})
  username = models.CharField({maxLength: 100, unique:true})
  email = models.CharField({blank: true, maxLength: 100})
  age = models.IntegerField()
}

```

<br/>

## Register model
Once you've defined your models, register them with Beast ORM, specifying the database name, version, type (IndexedDB or LocalStorage), and the models to register.

```javascript
import { models } from 'beast-orm';

models.register({
  databaseName: 'tutorial',
  version: 1,
  type: 'indexedDB',
  models: [User]
})

```
<br/>

## Creating objects


You can create objects from your models and save them to the database:
```javascript
const user = await User.create({username:'kobe', email:'kobe.bryant@lakers.com'})

```

To add multiple records in one go
```javascript
const usersToCreate = [
  {username:'kobe', email:'kobe.bryant@forever.com', age: 30},
  {username:'michael', email:'michael.jackson@forever.com', age: 30}
]

const users = await User.create(usersToCreate)

```
## Updating Object
this example changes its name and updates its record in the database

```javascript

const user = await User.get({userId:1})
user.username = 'New name'
user.save()

```


<br/>

## Querying  objects
The query is not executed as soon as the function is called 
### Querying  all objects
The simplest way to retrieve objects from a table is to get all of them. To do this, use the all() 
```javascript
await User.all()
```

<br/>

### Querying  specific objects with filters

#### 

**Filter**  - returns objects that match the given lookup parameters.

**get** - return object that match the given lookup 

parameters.

```javascript

const user = await User.get({username:'kobe'})

console.log(user.username) // kobe

```
**get** works only with one field only, one lookup parameter


Filter can have complex lookup parameters
```javascript

const users = await User.filter({age:10}).execute()


```
**Field lookup**

- **gt** - greater
- **gte** - greater or equal
- **lt** - less
- **lte** - less or equal
- **not** - different

Example:

```javascript

const users = await User.filter({age__gt: 10}).execute()
// sql Select * from User Where age > 10

const users = await User.filter({age__gt: 10, age__lt: 50}).execute()
// sql Select * from User Where age > 10 AND  age < 50

const users = await User.filter({age: 10, age__lt: 50}, {username: 'kobe'}).execute()
// sql Select * from User Where age = 10 AND  age < 50 OR username = 'kobe'

const users = await User.filter({age__not: 10}, [{age: 20},{username:'james'}]).execute()
// sql Select * from User Where not age = 10  OR (age = 20 OR username = 'james')

```
### Saving changes to objects
To save changes to an object that’s already in the database, use save().
```javascript

  const user = await User.get({username:'kobe'})
  user.username = 'james'
  user.save()
```
### Updating multiple objects at once
Sometimes you want to set a field to a particular value for all the objects 
You can do this with the update() method. For example:
```javascript

  User.filter({age:10}).update({age:11})
```
### Deleting objects

The delete method, conveniently, is named delete(). This method immediately deletes the object

```javascript
  User.delete()
```

You can also delete objects in bulk. Every QuerySet has a delete() method, which deletes all members of that QuerySet.

For example, this deletes all User objects with a age 40, and returns the number of objects deleted.

```javascript
  User.filter({age: 40}).delete()
```

<br/>
<br/>


## ArrayField

A field for storing lists of data. Most field types can be used, and you pass another field instance. You may also specify a size. ArrayField can be nested to store multi-dimensional arrays.

If you give the field a default, ensure it’s a callable such as list (for an empty default) or a callable that returns a list (such as a function). Incorrectly using default:[] creates a mutable default that is shared between all instances of ArrayField.
```javascript

const { ArrayField } = models.indexedDB.fields

class ChessBoardUser extends models.Model {
  board = ArrayField({
    field: ArrayField({
      field: models.CharField({maxLength:10, blank:true}),
      size:8,
    }),
    size:8,
  })
}

models.register({
  databaseName: 'tutorial-ArrayField',
  version: 1,
  type: 'indexedDB',
  models: [ChessBoardUser]
})

// valid
ChessBoardUser.create({
  board: [
    ['01','02','03','04','05','06','07','08'],
    ['21','22','23','24','25','26','27','28'],
    ['31','32','33','34','35','36','37','38'],
    ['41','42','43','44','45','46','47','48'],
    ['51','52','53','54','55','56','57','58'],
    ['61','62','63','64','65','66','67','68'],
    ['71','72','73','74','75','76','77','78'],
    ['81','82','83','84','85','86','87','88'],
  ]
})

```
<br/>
<br/>

### Querying ArrayField
There are a number of custom lookups and transforms for ArrayField. We will use the following example model:
```javascript

const { ArrayField } = models.indexedDB.fields

class Post extends models.Model {
  name = models.CharField({maxLength=200})
  tags = ArrayField({field:models.CharField({maxLength:200}), blank:true})
}


```
<br/>
<br/>

### contains
The contains lookup is overridden on ArrayField. The returned objects will be those where the values passed are a subset of the data. It uses the SQL operator @>. For example:

```javascript

Post.create({name:'First post', tags:['thoughts', 'django']})
Post.create({name:'Second post', tags:['thoughts']})
Post.create({name:'Third post', tags:['tutorial', 'django']})

Post.filter({tags__contains:['thoughts']}).execute()
// [<Post: First post>, <Post: Second post>]

Post.filter({tags__contains:['django']}).execute()
// [<Post: First post>, <Post: Third post>]

Post.filter({tags__contains:['django', 'thoughts']}).execute()
// [<Post: First post>]


```
<br/>
<br/>

### contained_by
This is the inverse of the contains lookup - the objects returned will be those where the data is a subset of the values passed. It uses the SQL operator <@. For example:

```javascript
Post.create({name:'First post', tags:['thoughts', 'django']}).execute()
Post.create({name:'Second post', tags:['thoughts']}).execute()
Post.create({name:'Third post', tags:['tutorial', 'django']}).execute()

Post.filter({tags__contained_by:['thoughts', 'django']}).execute()
// <Post: First post>, <Post: Second post>]

Post.filter({tags__contained_by:['thoughts', 'django', 'tutorial']}).execute()
// [<Post: First post>, <Post: Second post>, <Post: Third post>]


```

### overlap
Returns objects where the data shares any results with the values passed. Uses the SQL operator &&. For example:s the SQL operator <@. For example:

```javascript
Post.create({name:'First post', tags:['thoughts', 'django']}).execute()
Post.create({name:'Second post', tags:['thoughts']}).execute()
Post.create({name:'Third post', tags:['tutorial', 'django']}).execute()

Post.filter({tags__overlap:['thoughts']}).execute()
// [<Post: First post>, <Post: Second post>]

Post.filter({tags__overlap:['thoughts', 'tutorial']}).execute()
// [<Post: First post>, <Post: Second post>, <Post: Third post>]


```
<br/>
<br/>


### len
Returns the length of the array. The lookups available afterward are those available for IntegerField. For example:

```javascript
Post.create({name:'First post', tags:['thoughts', 'django']})
Post.create({name:'Second post', tags:['thoughts']})

Post.filter(tags__len=1).execute()
// [<Post: Second post>]


```
<br/>
<br/>


### Index transforms
Index transforms index into the array. Any non-negative integer can be used. There are no errors if it exceeds the size of the array. The lookups available after the transform are those from the base_field. For example:

```javascript

Post.create({name:'First post', tags:['thoughts', 'django']})
Post.create({name:'Second post', tags:['thoughts']})

Post.filter({tags__0:'thoughts'}).execute()
// [<Post: First post>, <Post: Second post>]

Post.filter({tags__1__iexact:'Django'}).execute()
// [<Post: First post>]

Post.filter({tags__276:'javascript'}).execute()
// []
```
<br>
<br>

## JSONField
Lookups implementation is different in JSONField, mainly due to the existence of key transformations. To demonstrate, we will use the following example model:
```javascript
const { JsonField } = models.indexedDB.fields

class Dog extends models.Model {
  name = models.CharField({maxLength:200})
  data = JsonField({null: false})
}

models.register({
  databaseName: 'tutorial-JsonField',
  version: 1,
  type: 'indexedDB',
  models: [Dog]
})
```
<br/>
<br/>

### Storing and querying for None
As with other fields, storing None as the field’s value will store it as SQL NULL. While not recommended, it is possible to store JSON scalar null instead of SQL NULL by using Value('null').

Whichever of the values is stored, when retrieved from the database, the Python representation of the JSON scalar null is the same as SQL NULL, i.e. None. Therefore, it can be hard to distinguish between them.

This only applies to None as the top-level value of the field. If None is inside a list or dict, it will always be interpreted as JSON null.

When querying, None value will always be interpreted as JSON null. To query for SQL NULL, use isnull:
```javascript

Dog.create({name:'Max', data: null})  # SQL NULL.
// <Dog: Max>
Dog.create({name:'Archie', data:Value('null')})  # JSON null.
// <Dog: Archie>
Dog.filter({data:null}).execute()
//  [<Dog: Archie>]
Dog.filter({data=Value('null')}).execute()
//  [<Dog: Archie>]
Dog.filter({data__isnull:true}).execute()
//  [<Dog: Max>]
Dog.filter({data__isnull:false}).execute()
//  [<Dog: Archie>]
```

### Key, index, and path transforms
To query based on a given dictionary key, use that key as the lookup name:

```javascript

Dog.create({name:'Rufus', data: {
  'breed': 'labrador',
  'owner': {
    'name': 'Bob',
    'other_pets': [{
      'name': 'Fishy',
    }],
  },
}})

Dog.create({name:'Meg', data:{'breed': 'collie', 'owner': null}})
// <Dog: Meg>
Dog.filter({data__breed:'collie'}).execute()
// [<Dog: Meg>]
```


Multiple keys can be chained together to form a path lookup:
```javascript

Dog.objects.filter({data__owner__name:'Bob'}).execute()
// [<Dog: Rufus>]
```

If the key is an integer, it will be interpreted as an index transform in an array:

```javascript

Dog.objects.filter({data__owner__other_pets__0__name:'Fishy'}).execute()
// [<Dog: Rufus>]
```

If the key you wish to query by clashes with the name of another lookup, use the contains lookup instead.

To query for missing keys, use the isnull lookup:
```javascript
Dog.objects.create({name:'Shep', data:{'breed': 'collie'}})

Dog.objects.filter({data__owner__isnull:true}).execute()
// [<Dog: Shep>]
```
Note

The lookup examples given above implicitly use the exact lookup. Key, index, and path transforms can also be chained with: icontains, endswith, iendswith, iexact, regex, iregex, startswith, istartswith, lt, lte, gt, and gte, as well as with Containment and key lookups.
<br/>
<br/>


### contains

The contains lookup is overridden on JSONField. The returned objects are those where the given dict of key-value pairs are all contained in the top-level of the field. For example:


```javascript
Dog.create({name:'Rufus', data:{'breed': 'labrador', 'owner': 'Bob'}})
// <Dog: Rufus>
Dog.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})
// <Dog: Meg>
Dog.create({name:'Fred', data:{}})
// <Dog: Fred>
Dog.filter({data__contains:{'owner': 'Bob'}}).execute()
// [<Dog: Rufus>, <Dog: Meg>]
Dog.filter({data__contains:{'breed': 'collie'}}).execute()
// [<Dog: Meg>]
```


### contained_by
This is the inverse of the contains lookup - the objects returned will be those where the key-value pairs on the object are a subset of those in the value passed. For example:


```javascript
Dog.create({name:'Rufus', data:{'breed': 'labrador', 'owner': 'Bob'}})
Dog.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})
Dog.create({name:'Fred', data:{}})

Dog.filter({data__contained_by:{'breed': 'collie', 'owner': 'Bob'}}).execute()
// [<Dog: Meg>, <Dog: Fred>]
Dog.filter({data__contained_by:{'breed': 'collie'}}).execute()
// [<Dog: Fred>]
```

### has_key
Returns objects where the given key is in the top-level of the data. For example:

```javascript
Dog.create({name:'Rufus', data:{'breed': 'labrador'}})
// [<Dog: Rufus>]
Dog.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})
// [<Dog: Meg>]
Dog.filter({data__has_key:'owner'}).execute()
// [<Dog: Meg>]
```

### has_keys
Returns objects where all of the given keys are in the top-level of the data. For example:
```javascript
Dog.create(name:'Rufus', data:{'breed': 'labrador'})
// [<Dog: Rufus>]
Dog.create({name:'Meg', data:{'breed': 'collie', 'owner': 'Bob'}})
// [<Dog: Meg>]
Dog.filter({data__has_keys:['breed', 'owner']})
// [<Dog: Meg>]
```
### has_any_keys
Returns objects where any of the given keys are in the top-level of the data. For example:
```javascript
Dog.create({name:'Rufus', data:{'breed': 'labrador'}})
// [<Dog: Rufus>]
Dog.create({name:'Meg', data:{'owner': 'Bob'}})
// [<Dog: Meg>]
Dog.filter({data__has_any_keys:['owner', 'breed']})
// [<Dog: Rufus>, <Dog: Meg>]
```
## Many-to-many relationships
In this example, an Article can be published in multiple Publication objects, and a Publication has multiple Article objects:
```javascript
class Publication extends models.Model {
  title = models.CharField({maxLength: 50})
}


class Article extends models.Model {
  headline = models.CharField({maxLength: 100})
  publication = models.ManyToManyField({model:Publication})
}

models.register({
  databaseName:'One-to-one-relationships',
  type: 'indexedDB',
  version: 1,
  models: [Publication, Article]
})

```

What follows are examples of operations that can be performed using the Python API facilities.

Create a few Publications:

```javascript
  const  p1 = await Publication.create({title:'The Python Journal'})
  const  p2 = await Publication.create({title:'Science News'})
  const  p3 = await Publication.create({title:'Science Weekly'})

```

Create an Article:
```javascript
  const a1 = await Article.create({headline:'lets you build web apps easily'})
  const a2 = await Article.create({headline:'NASA uses Python'})

```

Associate the Article with a Publication:
```javascript
  await a1.publication_add([p1, p2])

```
Article objects have access to their related Publication objects:
```javascript
  await a1.publication_all()

```
Article objects have access to their related Publication objects:
```javascript
  await p1.article_set_all()

```


## One-to-one relationships
In this example, a Place optionally can be a Restaurant:
```javascript
class Place extends models.Model {
  name = models.CharField({maxLength: 50})
  address = models.CharField({maxLength: 50})
} 

class Restaurant extends models.Model  {
  place = models.OneToOneField({model:Place})
  servesHotDogs = models.BooleanField({default: false})
  servesPizza = models.BooleanField({default: false})
}


await models.register({
  databaseName:'jest-test'+ new Date().getTime(),
  type: 'indexedDB',
  version: 1,
  models: [Place, Restaurant]
})

```

What follows are examples of operations that can be performed using the Python API facilities.

Create a couple of Places:

```javascript
  const p1 = await Place.create({name:'Demon Dogs', address:'944 W. Fullerton'})

```

Create a Restaurant. Pass the “parent” object as this object’s primary key:

```javascript
  const r = await Restaurant.create({place:p1, servesHotDogs: false, servesPizza:false})

```

A Restaurant can access its place:
```javascript
  const r = await p1.Restaurant.get()

```

A Place can access its restaurant, if available:
```javascript
  const p = await await r.Place().get()
```

## many-to-one relationships

```javascript
class Reporter extends models.Model {
  firstName = models.CharField({maxLength: 50})
  lastName = models.CharField({maxLength: 50})
  email = models.CharField()
}

class Article extends models.Model {
  headline = models.CharField({maxLength: 50})
  pubDate = models.DateField()
  reporter = models.ForeignKey({model:Reporter})
}


await models.register({
  databaseName:'jest-test'+ new Date().getTime(),
  type: 'indexedDB',
  version: 1,
  models: [Reporter, Article]
})

```

What follows are examples of operations that can be performed using the Python API facilities.

Create a few Reporters:

```javascript
const r1 = await Reporter.create({firstName: 'asdfsadf', lastName: 'asdfsd', email:'teste'})
const r2 = await Reporter.create({firstName: 'Peter', lastName: 'Maquiran', email:'teste'})

```

Create an Article:

```javascript
  const a = await Article.create({headline:"This is a test", pubDate:'', reporter:r1})

```


Reporter objects have access to their related Article objects:
```javascript
  const a = await await r1.article_setAll()

```

Add the same article to a different article set
```javascript
  const createdArticle = await r1.article_setAdd({headline:"This is a test", pubDate:''})

```
## Reactive List 
Reactive data, updates when a transaction is about to close. Store the query and run when a transaction is being committed. Great way to synchronize view with database.
```javascript
  class Person extends models.Model {
    username = models.CharField({})  
    age = models.IntegerField({blank:true})
  }
 
  models.migrate({
    databaseName:'jest-test',
    type: 'indexedDB',
    version: 1,
    models: [Person]
  })


```
Create a reactive data that update the value when a transaction is committed on the database.
```javascript
  const PersonList = Person.ReactiveList((model)=> model.all())
  const PersonAge5List = Person.ReactiveList((model)=> model.filter({age: 5}).execute())
```

Get the value
```javascript
  PersonList.value
// [<Person: Rufus>, <Person: Meg>]
```

unsubscribe the reactive list
```javascript
  PersonList.unsubscribe()
```

## Trigger transaction
```javascript
  class Person extends models.Model {
    username = models.CharField({})  
  }
 
  models.migrate({
    databaseName:'jest-test',
    type: 'indexedDB',
    version: 1,
    models: [Person]
  })

```

Create a callback function that fire every time a commit is made in the Person
```javascript
  let subscription = Person.transactionOnCommit( async () => {
    console.log('commit')
  })
```

unsubscribe
```javascript
  subscription.unsubscribe()
```

## Trigger { BEFORE | AFTER } { INSERT  | UPDATE  | DELETE}
 coming soon
 
<br>
<br>
<br>

# LocalStorage base api implementation.


## Create model

A model is a representation of a database table. Feel free to place your models anywhere that can be exported

```javascript
import { models } from 'beast-orm';

class Session extends models.LocalStorage {
  static username = models.preset()  
  static userId = models.preset()
  static token = models.preset()
} 
```

<br/>

## Register model
Once you’ve register your data models, automatically gives you a abstraction API for accessing local storage base api implementation that lets you create, retrieve, update and delete object.

```javascript
import { models } from 'beast-orm';

models.migrate({
  databaseName: 'tutorial',
  version: 1,
  type: 'localStorage',
  models: [Session],
  restore: true,
})
```

## Creating objects or Update

Change Session and save the changes, it will create the key value to the local storage in case it doesn't exist or simple update the value

```javascript
Session.username = 'kobe'
Session.userId = '1'
Session.token = 'fjif8382'
Session.save()
```

## Deleting objects

The delete method, conveniently, is named delete(). This method immediately deletes the object and returns the number of objects deleted and a dictionary with the number of deletions per object type. Example:

```javascript
  Session.delete()
```

## Module models.core.localStorage.rewrite
With this module you can rewrite get, save and delete function

```javascript
  import { AES, SHA1 } from  "crypto-js";
  const { rewriteSave, rewriteGet, rewriteDelete }  = models.core.localStorage.rewrite

  function GET({key, localStorage, instance}) {
    const newKey = SHA1(key).toString()

    const cipherText = localStorage.getItem(newKey)
    const bytes = AES.decrypt(cipherText, newKey)
    var decryptedData = bytes.toString(enc.Utf8);
    const restoredData = JSON.parse(decryptedData)

    Object.assign(instance, restoredData);

    return restoredData
  }


  function SAVE({key, localStorage, instance, dataToSave}) {

    const newKey = SHA1(key).toString()   

    const stringifyData  = JSON.stringify(dataToSave)
    const cipherText = AES.encrypt(stringifyData, newKey).toString();
    localStorage.setItem(newKey, cipherText)
  }

  function DELETE({key, localStorage, instance}) {
    const newKey = SHA1(key).toString()
    localStorage.removeItem(newKey)
  }

  rewriteGet.connect(GET, [Session])
  rewriteSave.connect(SAVE, [Session])
  rewriteDelete.connect(DELETE, [Session])
```


## Languages and Tools
<p align="left">   <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>  </a> <a href="https://jestjs.io" target="_blank"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a>    <a href="https://github.com/puppeteer/puppeteer" target="_blank"> <img src="https://www.vectorlogo.zone/logos/pptrdev/pptrdev-official.svg" alt="puppeteer" width="40" height="40"/>  </a>  <a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
</p>

## Documentation Credits


- This library takes inspiration from [django orm](https://docs.djangoproject.com/en/4.0/topics/db/queries/)
- [browser-orm](https://github.com/brianschardt/browser-orm)
- [indexeddb-orm](https://github.com/maxgaurav/indexeddb-orm)
- [use-indexeddb](https://github.com/hc-oss/use-indexeddb)
- [DjORMgo-js](https://github.com/Antman261/DjORMgo-js)

## 📜 License

MIT &copy; [BackdoorTech](https://github.com/https://github.com/BackdoorTech)
