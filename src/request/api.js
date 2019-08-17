import axios from 'axios';

const host = 'http://47.98.168.14:9094';

const instance = axios.create({
  baseURL: host,
})

export function getRealAlarm() {
  return instance.get('/getRealAlarm.do');
}

export function getAlarmHistory(args) {
  return axios.get('/mock/alarmHistory.json')
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
