import { take, call, all, fork, put } from 'redux-saga/effects';
import {
  setRealTimeMarkers,
} from '../actions/map';
import createSocketChannel from '../request/socket';
import { transformLatLng } from '../utils/map';

const markerTransformer = transformLatLng({ path: '' });

export function* watchSocket() {
  const socketChannel = yield call(createSocketChannel, 'ws://47.98.168.14:9094/socket/trail');
  while (true) {
    const data = yield take(socketChannel);
    switch (data.type) {
      case 'mapposition':
        const res = markerTransformer(data.data);
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
