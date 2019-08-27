import { take, call, all, fork, put } from 'redux-saga/effects';
import {
  setRealTimeMarkers,
} from '../actions/map';
import createSocketChannel from '../request/socket';
import { transformLatLng } from '../utils/map';
const prodUrl = 'ws://47.98.168.14:9094/socket/trail';
// const url = 'ws://192.168.8.147:80/socket/trail'
// const prodUrl = 'ws://15.75.19.155:80/socket/trail';
const url = 'ws://47.98.168.14:9094/socket/trail';
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

export default all([
  fork(watchSocket),
]);
