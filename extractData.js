const extractDataFromTable = ($, mapRow=null) => {
  let rows = $('Table tr')
  let data = []
  if(mapRow){
    data = rows.map(mapRow).get()
    //console.log('data', data)
  }
  else{
    data = rows.map((_, row)=>{
      return $(row).text()
    })
  }
  return data
}

module.exports = extractDataFromTable