function tid() {
  var mydate = new Date()
  var uuid = mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
  return uuid;
}
function rid() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
  
function getuuid() {
  return (tid() + "_" + rid() + "_" + rid() + "_" + rid())
}


export { getuuid }