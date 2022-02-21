# Beast ORM
An ORM wrapper for accessing indexedDB as a promise base api implementation.

## Inspirited by and related
<br>

<div style="display:flex">
<a href="https://github.com/brianschardt/browser-orm">
    <img src="https://upload.vectorlogo.zone/logos/github/images/47bfd2d4-712f-4dee-9315-f99c611b7598.svg" alt="github-svg" width="40" height="40"/>
</a>

<a href="https://www.npmjs.com/package/indexeddb-orm">
    <img src="https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg" alt="github-svg" width="40" height="40"/>
</a>

 <p  style="margin-top:5px; font-size: 12pt">indexeddb-orm</p>

</div>

<div style="display:flex">
    <a href="https://github.com/brianschardt/browser-orm">
    <img src="https://upload.vectorlogo.zone/logos/github/images/47bfd2d4-712f-4dee-9315-f99c611b7598.svg" alt="github-svg" width="40" height="40"/>
</a>

<a href="https://www.npmjs.com/package/browser-orm">
    <img src="https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg" alt="github-svg" width="40" height="40"/>
</a>

 <p  style="margin-top:5px; font-size: 12pt">Browser-orm </p>
</div>



My user model looks like:
### Example Model
```javascript
import { Model, Fields } from 'beast-orm';
const {CharField, JsonField} = Fields

export class User extends Model {
    
    username = CharField({maxLength: 100})
    email = CharField({require: true})

    fullName() {
        return this.first + ' ' + this.last;
    }

}
```

### Example Component
```javascript
import { User } from '/models/user'

const CreatedUser = User.create({username:'Peter', email:'Peter@gmail.com'})

const userFound = User.find({username:'Peter', email:'Peter@gmail.com'}).first()

// true
if(CreatedUser.username == userFound.username )  {
    console.log(userFound.fullName())
}

```

### Languages and Tools
<p align="left">   <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>  </a> <a href="https://jestjs.io" target="_blank"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a>    <a href="https://github.com/puppeteer/puppeteer" target="_blank"> <img src="https://www.vectorlogo.zone/logos/pptrdev/pptrdev-official.svg" alt="puppeteer" width="40" height="40"/>  </a>  <a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
</p>