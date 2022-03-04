// generate unique string
export function uniqueGenerator() {
    return (Math.random() +'uuid'+ new Date().getTime()).slice(2)
}



export function hashCode(str:string)  {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash;
    }
    return hash;
  }