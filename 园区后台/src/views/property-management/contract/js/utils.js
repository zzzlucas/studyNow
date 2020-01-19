export function getTags(tags) {
  let arr = new Array(0)
  if(tags.floorType !== ''){
    arr.push(tags.floorType)
  }
  if(tags.houseType !== ''){
    arr.push(tags.houseType)
  }
  if(tags.leaseType !== ''){
    arr.push(tags.leaseType)
  }
  if(tags.check.length > 0){
    arr = arr.concat(tags.check)
  }

  return arr
}
