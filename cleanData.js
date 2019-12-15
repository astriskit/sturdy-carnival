const cleanStr = (str, replacer)=>{
  if(str){
    let trimmedStr = str.split('').filter(l=>{
      if(l === '' || l==='\n'){
        return false
      }
      else{
        return true
      }
    }).join('').trim()
    if(replacer){
      return replacer(trimmedStr)
    }
    else{
      return trimmedStr
    }
  }
  else{
    return str
  }
}

module.exports = cleanStr