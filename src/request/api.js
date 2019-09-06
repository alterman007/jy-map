import axios from 'axios';
import { transformLatLng, transformPolygon } from '../utils/map';
import qs from 'querystring';
import moment from 'moment';
import coordtransform from 'coordtransform';
// const url = 'http://47.98.168.14:9094';
const url = 'http://192.168.1.130:9090'
// const produrl = 'http://47.98.168.14:9094'
// const url = 'http://15.75.19.155:9090/';
const produrl = 'http://15.75.19.155/';
const host = process.env.NODE_ENV === 'development' ? url : produrl

const urlencoded = {
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }
}

const instance = axios.create({
  baseURL: host,
});


// 查询实时车辆轨迹
export function getCarTrall() {
  return instance.get('/getCarTrall.do')
  .then(transformLatLng({path: "data", latName: "lat", lngName: "lng"}))
  .catch(err => null)
}

export function getTrall() {
  return instance.get('/getTrall.do')
}

//获取实时电台
export function getRadioTrall() {
  return instance.get('/getBjdtTrall.do')
}

export function getRealAlarm() {
  return instance.get('/getRealAlarm.do')
  .then(transformLatLng({path: "data", latName: "latitude", lngName: "longitude"}));
}

export function getPoliceCall() {
  return instance.post('/getBj110Entity.do?limit=10');
}

export function getAlarmHistory(args) {
  const { tabActive, timeRange } = args;
  const url = tabActive === 'face' ? '/getFaceAlarmEntity.do?limit=100' : '/getCarAlarmEntity.do?limit=100';
  const condition = {};
  if(timeRange) {
    condition.biggintime = moment(timeRange).format('YYYY-MM-DD 00:00:00')
    condition.endtime = timeRange
  } else {
    condition.endtime = moment().format('YYYY-MM-DD HH:mm:ss')
    condition.biggintime = moment(condition.endtime).format('YYYY-MM-DD 00:00:00')
  }
  return instance.post(url, qs.stringify(condition), urlencoded)
    .then(transformLatLng({path: "data", latName: "latitude", lngName: "longitude"}));
}


//获取联网警力历史
export function getForceHistory(args) {
  return instance.get('/getRealcardb.do', args)
  .then(transformLatLng({path: "data", latName: "lat", lngName: "lng"}))
}

export function getForceDetailById(args) {
  return axios.get('/mock/forceDetail.json')
}

// 获取车辆轨迹
export function getForcePathById(args) {
  if (args.name) {
    const { name, biggintime, endtime } = args;
    return instance.post(`/getCartrace.do?vehicleUploadFlag=${name}&biggintime=${biggintime ? biggintime : ""}&endtime=${endtime ? endtime: ""}`)
    .then(data => {
      const path = []
       data.data.result.forEach((d) => {
        if(d.longitude > 119 && d.longitude <122 && d.latitude > 29 && d.latitude < 32) {
          
          path.push([d.longitude, d.latitude])
          // path.push(coordtransform.wgs84togcj02(d.longitude, d.latitude))
        }
      })
      return path;
    })
    .catch(err => null)
  } else {
    const { humanId, biggintime, endtime } = args;
    return instance.post(`/getFaceAlarmEntity.do?humanId=${humanId}&biggintime=${biggintime ? biggintime : ""}&endtime=${endtime ? endtime: ""}`)
    .then(data => {
      const path = []
       data.data.forEach((d) => {
        if( d.longitude > 119 && d.longitude <122 && d.latitude > 29 && d.latitude < 32) {
          path.push([d.longitude, d.latitude])
        }
      })
      return path;
    })
    .catch(err => null)
  }
}

// 获取告警详情
export function getAlarmDetailById(args) {
  return axios.get('/mock/alarmDetail.json');
}

// 获取监控点位列表
export function getMonitorList(args) {
  return instance.get('/getcaremaposition.do')
  .then(transformLatLng({path: "data", latName: "latitude", lngName: "longitude"}))
}

// 获取车辆联网抓拍

export function getCarCaptureById(args) {
  return instance.post('/getCarEntity.do', qs.stringify(args), urlencoded)
  // return instance.post(`/getCarEntity.do?longitude=${args.lng}&latiude=${args.lat}`)
}

// 获取车辆人脸抓拍
export function getFaceCaptureById(args) {
  return instance.post('/getFaceEntity.do?limit=10', qs.stringify(args), urlencoded)
  // return instance.post(`/getCarEntity.do?longitude=${args.lng}&latiude=${args.lat}`)
}


// 获取分局统计

export function getPoliceStationStatistical(args) {
  console.log(args)
  return instance.get('/getdepartpcstj.do', {
    params: args
  })
}

// 获取密钥调取海康视频客户端
export function getAppSecrect() {
  return instance.get("/getappsecret.do")
}

// 调取海康软件
export async function monitorPlay(key) {
  try {
    const { data } = await getAppSecrect();
    console.log(data)
    var params = `hikvideoclient://ReqType:PlayReal;VersionTag:artemis;SvrIp:15.202.201.200;SvrPort:443;Appkey:27053604;AppSecret:${data.data.appSecret};time:${data.data.time};timesecret:${data.data.timeSecret};httpsflag:1;CamList:${key || 31011941001310013511};`
    // var param = 'hikvideoclient://ReqType:' + PalyType + ';' + 'VersionTag:artemis' + ';' + 'SvrIp:' + SvrIp + ';' + 'SvrPort:' + SvrPort + ';' + 'Appkey:' + appkey + ';' + 'AppSecret:' + appSecret + ';' + 'time:' + time + ';' + 'timesecret:' + timeSecret + ';' + 'httpsflag:' + httpsflag + ';' + 'CamList:' + CamList + ';';
    document.getElementById("exe").src = params
  } catch (error) {
    console.error(error)
    alert("错误")
  }
}

//查询派出所巡逻区域
export function getPoliceStatArea() {
  return axios.get("/mock/area.json")
}

//查询派出所边界
export function getfjinfo(args) {
  return instance.get(`/getfjibj.do?dm=${args}`)
  .then(({data}) => {
    return transformPolygon(data)
  })
  .catch(err => null)
}

export function getJqtongji() {
  return instance.get('/getJqtongji.do')
}

export function getbj110() {
  return instance.get('/getbj110.do')
}