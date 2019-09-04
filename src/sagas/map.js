import { takeLatest, take, call, all, fork, put } from 'redux-saga/effects';
import {
  setRealTimeMarkers, fetchMapTrail,setMapTrail, fetchMapPCSArea, setMapPCSArea, fetchRadioTrall, setRadioTrall
} from '../actions/map';
import createSocketChannel from '../request/socket';
import { transformLatLng } from '../utils/map';
import { getfjinfo, getCarTrall, getRadioTrall } from '../request/api';
// const prodUrl = 'ws://47.98.168.14:9094/socket/trail';
const url = 'ws://15.75.19.155/socket/trail'
const prodUrl = 'ws://15.75.19.155:80/socket/trail';
// const url = 'ws://47.98.168.14:9094/socket/trail';
const host = process.env.NODE_ENV === 'development' ? url : prodUrl

const markerTransformer = transformLatLng({path: ''})
export function* watchSocket() {
  const socketChannel = yield call(createSocketChannel, host);
  while (true) {
    const data = yield take(socketChannel);
    switch (data.type) {
      case 'mapposition':
        const res = markerTransformer(data.data)
        yield put(setRealTimeMarkers(res));
        break;
      default:
        console.log('unknown socket data type');
    }
  }
}

let isFetchCarTrall = false

export function* watchFetchTrail() {
  yield takeLatest(fetchMapTrail.startAction, function* (action) {
    const {data} = yield call(getCarTrall, action.payload);
    // console.log(data)
    // switch (data.type) {
    //   case 'mapposition':
      if(data && data.length > 0) {
        isFetchCarTrall = false
      }
      if(data && !isFetchCarTrall) {
        yield put(setMapTrail(data))
        isFetchCarTrall = true
      }
      //   break;
      // default:
      //   console.log('unknown socket data type');
    // }
  })
}

export function* watchFetchRadio() {
  yield takeLatest(fetchRadioTrall.startAction, function* (action) {
    const {data} = yield call(getRadioTrall, action.payload);
    yield put(setRadioTrall(data))
  })
}

export function* watchPCSArea() {
  yield takeLatest(fetchMapPCSArea.startAction, function* (action) {
    const data = yield call(getfjinfo, action.payload)
    yield put(setMapPCSArea(data))
  })
}

export default all([
  fork(watchFetchTrail),
  fork(watchPCSArea),
  fork(watchFetchRadio),
]);
