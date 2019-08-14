import axios from 'axios';

export function getAlarmHistory(args) {
  return axios.get('/mock/alarmHistory.json')
}

export function getForceHistory(args) {
  return axios.get('/mock/forceHistory.json')
}
