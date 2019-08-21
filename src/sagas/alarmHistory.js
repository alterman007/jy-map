import { takeLatest, call, fork, put, all } from 'redux-saga/effects';
import { getAlarmHistory } from '../request/api';
import {
  fetchAlarmHistory,
  setAlarmHistoryList,
} from '../actions/alarmHistory';

// 获取告警历史数据
function* watchFetchAlarmHistory() {
  yield takeLatest(fetchAlarmHistory.startAction, function* (action) {
    // console.log(action.payload);
    const { data } = yield call(getAlarmHistory, action.payload);
    console.log("获取告警历史数据",data);
    yield put(setAlarmHistoryList(data));
  });
}

export default all([
  fork(watchFetchAlarmHistory),
]);
