# Beast ORM

ORM for accessing indexedDB as a promise base api implementation.

### Create model

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

### Creating objects


the Query builder provides a convenient, fluent interface to creating and running database queries. It can be used to perform most database operations in your frontend application
```javascript

User.create({username:'kobe', email:'kobe.bryant@lakers.com'})

```



### Retrieving objects
#### Filter


```javascript

const user = User.filter({username:'kobe'}).first()

console.log(user.username) // kobe

```


## Credits

- This library takes inspiration from [django orm](https://docs.djangoproject.com/en/4.0/topics/db/queries/)
- [browser-orm](https://github.com/brianschardt/browser-orm)
- [indexeddb-orm](https://github.com/maxgaurav/indexeddb-orm)
- [use-indexeddb](https://github.com/hc-oss/use-indexeddb)

## 📜 License

MIT &copy; [BackdoorTech](https://github.com/https://github.com/BackdoorTech)