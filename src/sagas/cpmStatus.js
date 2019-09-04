import { takeLatest, take, call, all, fork, put } from 'redux-saga/effects';
import { fetchIsAlarmComing, setIsAlarmComing } from '../actions/cpmStatus';
import { getbj110 } from '../request/api';



function* watchIsAlarmComing() {
    yield takeLatest(fetchIsAlarmComing.startAction, function* (action) {
        // console.log("执行")
        // typeof data === boolean
      const { data } = yield call(getbj110, action.payload);
      if(data) {
        yield put(setIsAlarmComing('isAlarmComing'));
      } else {
        yield put(setIsAlarmComing(''));
      }
    });
  }
  



export default all([
    fork(watchIsAlarmComing)
]);
  