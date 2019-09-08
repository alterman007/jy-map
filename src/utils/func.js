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

function GetQueryValue(queryName) {
  var query = decodeURI(window.location.search.substring(1));
  var vars = query.split("&");
     for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("=");
          if (pair[0] == queryName) { return pair[1]; }
      }
      return null;
}

export { getuuid, GetQueryValue }