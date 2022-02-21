import * as Fields from './../field/fields.js'
 
export class FieldsInText {
  
    static textToOneLine(text: string) {
      return text.replace(/\r/g, "").replace(/\n/g, "")
    }
  
    static getMatchAllField(oneLineString: string) {
      let Fields = oneLineString.toString()
        .match(/this.(\w*\s*)=.+([)];)/g).map((e)=>{
          return e.split(';')
        })[0] || []

      Fields.map((e)=>{
        return e.split(';')
      })

      Fields = Fields.slice(0 , -1)

      console.log('Fields', Fields)
      return Fields
    }
  
    static getDeclarations(matchAllField: string[]) {
      let declarations = {} 
      
      matchAllField.forEach((declaration) => {
        declaration = declaration
        .replace('this.','') // remove this. keyword
        .replace(/\s*=\s*/,'=') // remove space after and before the equal. Ex: "this.username  =   CharField({ maxLength: 90 })" output "this.username=CharField({ maxLength: 90 })"
        
        let  [FieldName, FieldTypeAsString] = declaration.split('=')
        FieldName = FieldName.trim()

        declarations[FieldName] = this.FieldTypeAsStringToObject(FieldTypeAsString)
      })

      return declarations
    }

    static FieldTypeAsStringToObject(FieldTypeAsString: string) {

      const FieldsType = Object.keys(Fields).find((key) => {
        return FieldTypeAsString.startsWith(key)
      })

      const Field = Fields[FieldsType] 
      
      var regex = new RegExp(`${FieldsType}[(][{]`);

      let FieldArguments: string
      // has argument
      if(FieldTypeAsString.match(regex)?.length == 1) {
        FieldArguments = FieldTypeAsString.replace(regex, '').slice(0, -1)
        FieldArguments = '{'+ FieldArguments

       let args = this.stringArgumentToObject(FieldArguments)
       args = JSON.parse(args)
       
        return Field(args)
      }

      return Field()
    }

    static stringArgumentToObject(strFieldArguments: string) {
      strFieldArguments.replace('{ ','').split(', ').map((e)=>{
        return e.split(':')[0]
        }).forEach((e) => {
          strFieldArguments =  strFieldArguments
            .replace('{ '+e+':',`{ "${e}":`)
            .replace(', '+e+':',`, "${e}":`)
        })
      
      return strFieldArguments
    }
  
    static getFieldsAndType(ModelInstance) {
      const oneLineText = this.textToOneLine(ModelInstance.toString())
      const matchFields = this.getMatchAllField(oneLineText)
      const declaration = this.getDeclarations(matchFields)
  
      return declaration
    }
  }