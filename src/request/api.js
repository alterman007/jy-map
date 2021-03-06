import axios from 'axios';
import { transformLatLng } from '../utils/map';

const host = 'http://47.98.168.14:9094';

const instance = axios.create({
  baseURL: host,
})

export function getRealAlarm() {
  return instance.get('/getRealAlarm.do')
    .then(transformLatLng({ path: 'data', latName: 'latitude', lngName: 'longitude' }));
}

export function getPoliceCall() {
  return instance.post('/getBj110Entity.do?limit=50');
}

export function getAlarmHistory(args) {
  const { tabActive, timeRange } = args;
  const url = tabActive === 'face' ? '/getFaceAlarmEntity.do' : '/getCarAlarmEntity.do';
  const condition = {};
  if (timeRange && timeRange[0]){
    condition.biggintime = timeRange[0].valueOf();
  }
  if (timeRange && timeRange[1]){
    condition.endtime = timeRange[1].valueOf();
  }
  return instance.post(url, condition)
    .then(transformLatLng({ path: 'data.result', latName: 'latitude', lngName: 'longitude' }));
}

export function getForceHistory(args) {
  return axios.get('/mock/forceHistory.json')
}

export function getForceDetailById(args) {
  return axios.get('/mock/forceDetail.json')
}

export function getForcePathById(args) {
  return axios.get('/mock/forcePath.json')
}

export function getAlarmDetailById(args) {
  return axios.get('/mock/alarmDetail.json')
}
