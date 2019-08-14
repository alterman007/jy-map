import { takeLatest, call, fork, put, all } from 'redux-saga/effects';
import { getForceHistory } from '../request/api';
import {
  fetchForceHistory,
  setForceHistoryList,
} from '../actions/forceHistory';

// 获取警力历史数据
function* watchFetchForceHistory() {
  yield takeLatest(fetchForceHistory.startAction, function* (action) {
    const res = yield call(getForceHistory, action.payload);
    // console.log(res);
    yield put(setForceHistoryList(res.data));
  });
}

export default all([
  fork(watchFetchForceHistory),
]);
