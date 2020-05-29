const imageObj = (imgObject) => {
  if(imgObject && imgObject.filename)
  return '/uploads/'+imgObject.filename;
  else return '/images/not-found.png'
}

module.exports = {
  imageObj
}