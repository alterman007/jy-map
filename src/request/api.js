import axios from 'axios';
import { transformLatLng } from '../utils/map';

const url = 'http://47.98.168.14:9094';
// const url = 'http://15.75.19.155/';
const host = process.env.NODE_ENV === 'development' ? url : 'http://15.75.19.155'

const instance = axios.create({
  baseURL: host,
});

export function getRealAlarm() {
  return instance.get('/getRealAlarm.do')
  .then(transformLatLng({path: "data", latName: "latitude", lngName: "longitude"}));
}

export function getPoliceCall() {
  return instance.post('/getBj110Entity.do?limit=50');
}

export function getAlarmHistory(args) {
  // return axios.get('/mock/alarmHistory.json');
  const { tabActive, timeRange } = args;
  const url = tabActive === 'face' ? '/getFaceAlarmEntity.do?limit=20' : '/getCarAlarmEntity.do?limit=20';
  const condition = {};
  if (timeRange && timeRange[0]){
    condition.biggintime = timeRange[0].valueOf();
  }
  if (timeRange && timeRange[1]){
    condition.endtime = timeRange[1].valueOf();
  }
  // console.log(url, condition);
  return instance.post(url, condition)
    .then(transformLatLng({path: "data", latName: "latitude", lngName: "longitude"}));
}

export function getForceHistory(args) {
  return instance.get('/getRealcardb.do')
  .then(transformLatLng({path: "data", latName: "lat", lngName: "lng"}))
}

export function getForceDetailById(args) {
  return axios.get('/mock/forceDetail.json')
}

// 获取车辆轨迹
export function getForcePathById(args) {
  const { name, biggintime, endtime } = args;
  return instance.post(`/getCarEntity.do?vehicleIdentification=${name}&biggintime=${biggintime ? biggintime : ""}&endtime=${endtime ? endtime: ""}`).then(data => {
    const path = []
     data.data.forEach((d) => {
      if( d.longitude > 119 && d.longitude <122 && d.latitude > 29 && d.latitude < 32) {
        path.push([d.longitude, d.latitude])
      }
    })
    return path;
  })
}

// 获取告警详情
export function getAlarmDetailById(args) {
  return axios.get('/mock/alarmDetail.json');
}

// 获取监控点位列表
export function getMonitorList(args) {
  return instance.get('/getcaremaposition.do')
  // return axios.get('/mock/eseM.json')
  .then(transformLatLng({path: "data", latName: "latitude", lngName: "longitude"}))
}

// 获取车辆联网抓拍

export function getCarCaptureById(args) {
  return instance.post(`/getCarEntity.do?carentity=${args}`)
}

// 获取分局统计

export function getPoliceStationStatistical(args) {
  return instance.get("/getdepart.do")
}

// 获取密钥调取海康视频客户端
export function getAppSecrect() {
  return instance.get("/getappsecret.do")
}

// 调取海康软件
export async function monitorPlay(key) {
  try {
    const { data } = await getAppSecrect();
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
export function getPoliceBorder() {
  return instance.get("/areaT.json")
}
