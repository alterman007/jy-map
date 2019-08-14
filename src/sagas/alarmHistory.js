import { takeLatest, call, fork, put, all } from 'redux-saga/effects';
import { getAlarmHistory } from '../request/api';
import {
  fetchAlarmHistory,
  setAlarmHistoryList,
} from '../actions/alarmHistory';

// 获取告警历史数据
function* watchFetchAlarmHistory() {
  yield takeLatest(fetchAlarmHistory.startAction, function* (action) {
    const res = yield call(getAlarmHistory, action.payload);
    yield put(setAlarmHistoryList(res.data));
  });
}

export default all([
  fork(watchFetchAlarmHistory),
]);
