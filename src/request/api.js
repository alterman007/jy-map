import axios from 'axios';
import qs from 'querystring';
import moment from 'moment';
import { dm } from '@/utils/func';
import { transformLatLng, transformPolygon } from '../utils/map';
import { convertDataToGeojson } from '@/utils/map';
import coordtransform from 'coordtransform';
import { transformKeyValues, transformRealAlarmKeysValues } from '../utils/func';
// const url = 'http://47.98.168.14:9094';
// const url = 'http://192.168.1.135:9090'
const url = 'http://15.75.19.155/'
const produrl = 'http://47.98.168.14:9094'
// const url = 'http://15.75.19.155:9090/';
// const produrl = 'http://15.75.19.155/';
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
  return instance.get(`/getCarTrall.do?dm=${dm}`)
    .then(transformLatLng({ path: "data", latName: "lat", lngName: "lng" }))
    .catch(err => null)
}

export function getTrall() {
  return instance.get(`/getTrall.do?dm=${dm}`)
}

//获取实时电台
export function getRadioTrall() {
  return instance.get(`/getBjdtTrall.do?dm=${dm}`)
}

//获取实时告警
export function getRealAlarm() {
  return instance.get(`/getRealAlarm.do?dm=${dm}`)
    .then(transformLatLng({ path: "data", latName: "latitude", lngName: "longitude" }))
    .then(transformRealAlarmKeysValues);
}

//110联网警情
export function getPoliceCall() {
  return instance.post(`/getBj110Entity.do?limit=20&dm=${dm}`);
}

//获取人脸 | 车辆 告警历史
export function getAlarmHistory(args) {
  let { tabActive, timeRange, pagesize, pagenum, selectType } = args;
  const url = tabActive === 'face' ? selectType ? `/getFaceAlarmcheliang.do?dm=${dm}
  `: `/getFaceAlarmkakou.do?dm=${dm}` : selectType ? `/getCarAlarmcheliang.do?dm=${dm}` : `/getCarAlarmkakou.do?dm=${dm}`;
  const condition = {};
  if (timeRange) {
    condition.biggintime = moment(timeRange).format('YYYY-MM-DD 00:00:00')
    condition.endtime = timeRange
  } else {
    condition.endtime = moment().format('YYYY-MM-DD HH:mm:ss')
    condition.biggintime = moment(condition.endtime).format('YYYY-MM-DD 00:00:00')
  }
  condition.pagenum = pagenum;
  condition.pagesize = pagesize;
  // condition.endtime = '2019-08-31 23:59:00'
  // condition.biggintime = '2019-08-31 00:00:00'
  // condition.endtime = '2018-07-25 23:59:00' // 车载车辆
  // condition.biggintime = '2018-07-25 00:00:00'
  // condition.endtime = '2018-08-10 23:59:00' // 人脸车载
  // condition.biggintime = '2018-08-10 00:00:00'
  // return axios.get('/mock/alarmHistory.json')
  return instance.post(url, qs.stringify(condition), urlencoded)
    .then(transformLatLng({ path: "data.list", latName: "latitude", lngName: "longitude" }))
    .then(transformKeyValues)
    .catch(err => null);
}


//获取联网警力历史
export function getForceHistory(args) {
  return instance.get(`/getRealcardb.do?dm=${dm}`, args)
    .then(transformLatLng({ path: "data", latName: "lat", lngName: "lng" }));
}

export function getForceDetailById(args) {
  return axios.get('/mock/forceDetail.json')
}

// 获取车辆轨迹
export function getForcePathById(args) {
  if (!args.humanId) {
    const { name, biggintime, endtime } = args;
    return instance.post(`/getCartrace.do?dm=${dm}&vehicleUploadFlag=${name}&biggintime=${biggintime ? biggintime : ""}&endtime=${endtime ? endtime : ""}`)
      .then(data => {
        const path = []
        data.data.result.forEach((d) => {
          if (d.longitude > 119 && d.longitude < 122 && d.latitude > 29 && d.latitude < 32) {

            path.push([d.longitude, d.latitude])
            // path.push(coordtransform.wgs84togcj02(d.longitude, d.latitude))
          }
        })
        return path;
      })
      .catch(err => null)
  } else {
    const { humanId, biggintime, endtime } = args;
    return instance.post(`/getFaceAlarmkakou.do?dm=${dm}&humanId=${humanId}&biggintime=${biggintime ? biggintime : ""}&endtime=${endtime ? endtime : ""}`)
      .then(data => {
        const path = []
        data.data.forEach((d) => {
          if (d.longitude > 119 && d.longitude < 122 && d.latitude > 29 && d.latitude < 32) {
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
  return instance.get(`/getcaremaposition.do?dm=${dm}`)
    .then(transformLatLng({ path: "data", latName: "latitude", lngName: "longitude" }))
}

// 获取车辆联网抓拍
export function getCarCaptureById(args) {
  return instance.post(`getCarEntity.do?dm=${dm}`, qs.stringify(args), urlencoded)
  // return instance.post(`/getCarEntity.do?longitude=${args.lng}&latiude=${args.lat}`)
}

// 获取车辆人脸抓拍
export function getFaceCaptureById(args) {
  return instance.post(`/getFaceEntity.do?dm=${dm}`, qs.stringify(args), urlencoded)
  // return instance.post(`/getCarEntity.do?longitude=${args.lng}&latiude=${args.lat}`)
}


// 获取分局统计

export function getPoliceStationStatistical(args) {
  // return axios.get('/mock/110call.json');
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
    .then(({ data }) => {
      return transformPolygon(data)
    })
    .catch(err => null)
}

// 根据dm查询派出所巡逻点位;
export function getxlxl(args) {
  return instance.get(`/getxlxl.do?dm=${args}`)
    .then(({ data }) => {
      return data.map(d => {
        return convertDataToGeojson(d.list, 'polygon')
      })
    });
}

// 根据dm查询主巡线路
export function getzhuxl(args) {
  return instance.get(`/getzhuxl.do?dm=${args}`)
    .then(({ data }) => {
      return data.map(d => {
        return convertDataToGeojson(d.list, 'lineString')
      })
    })
}

// 根据dm查询签到点位
export function getgddqd(args) {
  return instance.get(`/getgddqd.do?dm=${args}`)
    .then(transformLatLng({ path: 'data', latName: 'Y', lngName: 'X' }))
    .then(data => {
      return data.data
    })
}

export function getBaseStationWifi(args) {
  return instance.get(`/getGwifi.do?dm=${dm}`)
  .then(transformLatLng({path:'data', latName: 'XPOINT', lngName: 'YPOINT'}))
}

export function getJqtongji() {
  return instance.get('/getJqtongji.do');
}

//
export function getbj110() {
  return instance.get(`/getbj110.do?dm=${dm}`);
}