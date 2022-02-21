export class FieldsInText {
  
    static textToOneLine(text: string) {
      return text.replace(/\r/g, "").replace(/\n/g, "")
    }
  
    static getMatchAllField(oneLineString: string) {
      return oneLineString.toString()
        .match(/this.(\w*\s*)=.+([)];)/g) // match all declarations
    }
  
    static getDeclarations(matchAllField: string[]) {
      let declarations = {} 
      
      matchAllField.forEach((declaration) => {
        declaration = declaration
          .replace('this.','') // remove this. keyword
          .slice(0, -1) //remove ; the last element on the string
        
          const [FieldName, FieldTypeAsString] = declaration.split('=')
          declarations[FieldName] = FieldTypeAsString
      })

      return declarations
    }
  
    static getFieldsAndType(ModelInstance) {
      const oneLineText = this.textToOneLine(ModelInstance.toString())
      const matchFields = this.getMatchAllField(oneLineText)
      const declaration = this.getDeclarations(matchFields)
  
      return declaration
    }
  }