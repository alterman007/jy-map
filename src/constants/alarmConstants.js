export const alarmType = ['车载-人脸告警', '卡口-人脸告警', '卡口-车辆告警', '车载-车辆告警', '车辆抓拍'];
export const alarmKeys = ['name', 'baseImage', 'hdpicImage', 'alarmTime', 'address', 'lat', 'lng', 'id', 'indexCode', 'humans', 'reason'];
export const alarmtimes = ['msg', 'alarmTime', 'passTimeStr', 'createDate'];

export const faceByCarMonitor = ['alarmId', 'facePicUrl', 'bkgPicUrl', 'alarmTime', 'cameraName', 'lat', 'lng', 'id', 'indexCode', 'humans'];
export const faceByFixedMonitor = ['humanName', 'facePicUrl', 'bkgPicUrl', 'alarmTime', 'cameraName', 'lat', 'lng', 'humanId', 'indexCode', 'humans'];
export const carByFixedMonitor = ['plateInfo', 'picPlate', 'picVehicle', 'passTimeStr', 'crossingName', 'lat', 'lng', 'id', 'indexCode'];
export const carBayCarMonitor = ['cph', 'cpImagerSrc', 'cpImagerSrc', 'createDate', 'cameraName', 'lat', 'lng', 'id', 'indexCode', '', 'bdjg'];

const imgType = {
  '人脸告警': '姓名',
  '车辆告警': '车牌',
  '车辆抓拍': '抓拍位置',
  '卡口-人脸告警': '姓名',
  '卡口-车辆告警': '车牌',
  '车载-车辆告警': '车牌',
  '车载-人脸告警': '姓名'
}

export const getAlarmType = (type) => {
  return imgType[alarmType[type]]
}
