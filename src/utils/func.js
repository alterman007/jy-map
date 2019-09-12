import data from '../containers/Map/Area/shanghai.json';
import { alarmtimes, alarmKeys } from '../constants/alarmConstants';

function tid() {
  var mydate = new Date()
  var uuid = mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
  return uuid;
};

function rid() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

function getuuid() {
  return (tid() + "_" + rid() + "_" + rid() + "_" + rid())
};

function GetQueryValue(queryName) {
  var query = decodeURI(window.location.search.substring(1));
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == queryName) { return pair[1]; }
  }
  return null;
};

const dm = GetQueryValue('dm') || 310000000000;

const realArea = data.features.find(d => {
  return dm == d.properties.adcode + '000000'
});

const transformKeyByTimes = (keys, values, type) => {
  const res = [];
  values.map(item => {
    let result = {}
    keys.map((key, index) => {
      result[alarmKeys[index]] = item[key];
      result.type = type;
    })
    res.push(result);
    result = {};
  })
  return res;
}


export const transformKeyValues = (data) => {
  let result = [];
  const values = data.data.list;
  alarmtimes.some(time => {
    if (values && values[0] && Object.keys(values[0]).includes(time)) {
      switch (time) {
        case 'msg':
          result = transformKeyByTimes(['alarmId', 'facePicUrl', 'bkgPicUrl', 'alarmTime', 'cameraName', 'lat', 'lng', 'id', 'indexCode', 'humans'], values, 0);
          return true;
        case 'alarmTime':
          result = transformKeyByTimes(['humanName', 'facePicUrl', 'bkgPicUrl', 'alarmTime', 'cameraName', 'lat','lng', 'humanId', 'indexCode', 'humans'], values, 1);
          return true;
        case 'passTimeStr':
          result = transformKeyByTimes(['plateInfo', 'picPlate', 'picVehicle', 'passTimeStr', 'crossingName', 'lat', 'lng', 'id', 'indexCode'], values, 2)
          return true;
        case 'createDate':
          result = transformKeyByTimes(['cph', 'cpImagerSrc', 'cpImagerSrc', 'createDate', 'cameraName', 'lat', 'lng', 'id', 'indexCode', '', 'bdjg'], values, 3);
          return true;
        default:
          result = values;
          return true;
      }
    }
  });
  return result;
}


export { getuuid, dm, realArea, GetQueryValue }