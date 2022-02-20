class getFieldsFromString {
  
  static textToOneLine(text: string) {
    return text.replace(/\r/g, "").replace(/\n/g, "")
  }

  static matchAllField(oneLineString) {
    return oneLineString.toString().replace(/\r/g, "").replace(/\n/g, "").match(/(\w*)\s*=/g)
  }

  getDeclarations(matchAllField, oneLineString) {
    let declarations = [] 
    let from = 0

    for(let a = 0; a <= matchAllField.length; a++) {
      let declarationStart = oneLineString.indexOf(matchAllField[a], from)
      let equal = oneLineString.indexOf("=", declarationStart)
      let declarationEnd = oneLineString.indexOf(matchAllField[a+1], equal)
      from = declarationEnd
  
      const declaration = oneLineString.slice(declarationStart, declarationEnd)
      declarations.push(declaration)
    }
  }

  static getColumns(ModelInstance) {

  }
}