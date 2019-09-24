import data from '../containers/Map/Area/shanghai.json';
import { alarmtimes, alarmKeys, faceByCarMonitor, faceByFixedMonitor, carByFixedMonitor, carBayCarMonitor } from '../constants/alarmConstants';

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
      result.detailInfo = item;
    })
    res.push(result);
    result = {};
  })
  return res;
}

const transformRealAlarmKeysValuesByTimes = (keys, val, type) => {
  const result = {};
  keys.map((key, index) => {
    result[alarmKeys[index]] = val[key]
    result.type = type;
    result.detailInfo = val
  })
  return result;
} 


export const transformRealAlarmKeysValues = (data) => {
  const values = data.data.list;
  const res = [];
  let result = {};
  values && values.map(val => {
    alarmtimes.some(time => {
      if (Object.keys(val).includes(time)) {
        switch (time) {
          case 'msg':
            result = transformRealAlarmKeysValuesByTimes(faceByCarMonitor, val, 0);
            return true;
          case 'alarmTime':
            result = transformRealAlarmKeysValuesByTimes(faceByFixedMonitor, val, 1);
            return true;
          case 'passTimeStr':
            result = transformRealAlarmKeysValuesByTimes(carByFixedMonitor, val, 2)
            return true;
          case 'createDate':
            result = transformRealAlarmKeysValuesByTimes(carBayCarMonitor, val, 3);
            return true;
          default:
            result = val;
            return true;
        }
      }
    })
    res.push(result)
  })
  return {
    list: res,
    res: data.data && data.data.res
  };
}

export const transformKeyValues = (data) => {
  let result = [];
  const values = data.data.list;
  alarmtimes.some(time => {
    if (values && values[0] && Object.keys(values[0]).includes(time)) {
      switch (time) {
        case 'msg':
          result = transformKeyByTimes(faceByCarMonitor, values, 0);
          return true;
        case 'alarmTime':
          result = transformKeyByTimes(faceByFixedMonitor, values, 1);
          return true;
        case 'passTimeStr':
          result = transformKeyByTimes(carByFixedMonitor, values, 2)
          return true;
        case 'createDate':
          result = transformKeyByTimes(carBayCarMonitor, values, 3);
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