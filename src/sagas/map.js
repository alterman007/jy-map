import { take, call, all, fork, put } from 'redux-saga/effects';
import {
  setRealTimeMarkers,
} from '../actions/map';
import createSocketChannel from '../request/socket';

export function* watchSocket() {
  const socketChannel = yield call(createSocketChannel, 'ws://47.98.168.14:9094/socket/trail');
  while (true) {
    const data = yield take(socketChannel);
    // console.log(data);
    switch (data.type) {
      case 'mapposition':
        yield put(setRealTimeMarkers(data.data));
        break;
      default:
        console.log('unknown socket data type');
    }
  }
}

export default all([
  fork(watchSocket),
]);
