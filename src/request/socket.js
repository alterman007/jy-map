import { eventChannel } from 'redux-saga';
import Socket from '../core/socket';

export default function createSocketChannel(url) {
  const source = new Socket(url);
  return eventChannel((emitter) => {
    source.on('data', emitter);
    return () => {
      source.destroy();
    };
  })
}
