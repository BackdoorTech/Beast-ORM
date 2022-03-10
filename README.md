# Beast ORM

ORM for accessing indexedDB as a promise base api implementation.

## DBMS Support

- IndexedDB
- Sqlite **(Will be publish in version 2.0.0)**

<br/>

## Features
- Create Models, drop, create, get, filter, remove, aggregated functions

<br/>

## Create model

A model is a representation of a database table. Feel free to place your models anywhere that can be exported

```javascript
import { models } from 'beast-orm';

class User extends models.Model {

  userId = models.AutoField({primaryKey:true})
  username = models.CharField({maxLength: 100})
  email = models.CharField({blank: true, maxLength: 100})
  age = models.IntegerField()

}

```

<br/>

## Register model
Once you’ve register your data models, automatically gives you a database-abstraction API for accessing indexedDB as a promise base api implementation that lets you create, retrieve, update and delete objects. Models that belongs to the same database should be register at the same time.

```javascript
import { models } from 'beast-orm';
import { User } from './models/user.js';

models.register({
  databaseName: 'tutorial',
  version: 1,
  type: 'IndexedDB',
  models: [User]
})

```

<br/>

## Creating objects


the Query builder provides a convenient, fluent interface to creating and running database queries. It can be used to perform most database operations in your frontend application.
```javascript

const user = await User.create({username:'kobe', email:'kobe.bryant@lakers.com'})
// or
const rows = User.create(arrayUser)

```

<br/>

## Retrieving objects
The query is not executed as soon as the function is called 
### Retrieving all objects
The simplest way to retrieve objects from a table is to get all of them. To do this, use the all() 
```javascript
User.all()
```

<br/>

### Retrieving specific objects with filters

#### 

**Filter**  - returns objects that match the given lookup parameters.

**get** - return object that match the given lookup 

parameters.

```javascript

const user = await User.get({username:'kobe'})

console.log(user.username) // kobe

```
**get** only works with unique fields


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

  await User.filter({age:10}).update({age:11})
```
### Deleting objects

The delete method, conveniently, is named delete(). This method immediately deletes the object and returns the number of objects deleted and a dictionary with the number of deletions per object type. Example:

```javascript
  const deleteRowsCount = await User.filter({age: 10}).delete()
	// or
  const userJames = await User.get({username:'kobe'})
  userJames.delete()
```

<br/>
<br/>

## Languages and Tools
<p align="left">   <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>  </a> <a href="https://jestjs.io" target="_blank"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a>    <a href="https://github.com/puppeteer/puppeteer" target="_blank"> <img src="https://www.vectorlogo.zone/logos/pptrdev/pptrdev-official.svg" alt="puppeteer" width="40" height="40"/>  </a>  <a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
</p>

## Credits

- This library takes inspiration from [django orm](https://docs.djangoproject.com/en/4.0/topics/db/queries/)
- [browser-orm](https://github.com/brianschardt/browser-orm)
- [indexeddb-orm](https://github.com/maxgaurav/indexeddb-orm)
- [use-indexeddb](https://github.com/hc-oss/use-indexeddb)
- [DjORMgo-js](https://github.com/Antman261/DjORMgo-js)

## 📜 License

MIT &copy; [BackdoorTech](https://github.com/https://github.com/BackdoorTech)