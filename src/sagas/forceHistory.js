import { takeLatest, call, fork, put, all } from 'redux-saga/effects';
import {
  fetchForceHistory,
  setForceHistoryList,
  fetchForcePath,
} from '../actions/forceHistory';
import {
  setMapPath,
  setMoveFlag,
} from '../actions/map';
import {
  getForceHistory,
  getForcePathById,
} from '../request/api';

// 获取警力历史数据
function* watchFetchForceHistory() {
  yield takeLatest(fetchForceHistory.startAction, function* (action) {
    const res = yield call(getForceHistory, action.payload);
    yield put(setForceHistoryList(res.data));
  });
}

function* watchFetchForcePath() {
  yield takeLatest(fetchForcePath.startAction, function* (action) {
    yield put(setMoveFlag(action.payload.moveFlag));
    const res = yield call(getForcePathById, action.payload);
    if (!res || res.length < 2) {
      return;
    }
    yield put(setMapPath(res));
  });
}

export default all([
  fork(watchFetchForceHistory),
  fork(watchFetchForcePath),
]);
