# Beast ORM

ORM for accessing indexedDB as a promise base api implementation.

## Create model

A model is a representation of a database table. Feel free to place your models anywhere that can be exported

```javascript
import { models } from 'beast-orm';

class User extends models.Model {
    
    username = models.CharField({maxLength: 100})
    email = models.CharField({require: true})
}

```

Once you’ve register your data models, automatically gives you a database-abstraction API for accessing indexedDB as a promise base api implementation that lets you create, retrieve, update and delete objects. Models that belongs to the same database should be register at the same time.

```javascript
import { models } from 'beast-orm';

models.register({
    databaseName: 'tutorial',
    version: 0,
    models: [User]
})

```

## Creating objects


the Query builder provides a convenient, fluent interface to creating and running database queries. It can be used to perform most database operations in your frontend application
```javascript

User.create({username:'kobe', email:'kobe.bryant@lakers.com'})

```


## Retrieving objects
### Retrieving all objects
The simplest way to retrieve objects from a table is to get all of them. To do this, use the all() 
```javascript
User.filter({username:'kobe'}).all()
```

### Retrieving specific objects with filters

#### 

**Filter**  - returns objects that match the given lookup parameters.

**Exclude** - returns objects that do not match the given lookup parameters.

```javascript

const user = User.filter({username:'kobe',}).first()

console.log(user.username) // kobe

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

## 📜 License

MIT &copy; [BackdoorTech](https://github.com/https://github.com/BackdoorTech)