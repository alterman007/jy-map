import EventEmitter from 'eventemitter3';

class Socket extends EventEmitter {
  constructor(url, protocol) {
    super();
    this.url = url;
    this.protocol = protocol;
    this.initSocket();
    this.maxRetry = 10;
    this.retryCount = 0;
  }
  initSocket() {
    this.socket = new WebSocket(this.url, this.protocol);
    let socket = this.socket;
    socket.onmessage = (ev) => {
      try {
        let data = JSON.parse(ev.data);
        this.emit('data', data);
      } catch (error) {
        console.log(error);
      }
    };
    socket.onclose = this.retry;
    socket.onerror = this.retry;
    socket.onopen = () => {
      this.retryCount = 0;
      console.log('connected');
      if (socket.readyState !== socket.OPEN) {
        this.retry();
      }
    };
  }
  retry = () => {
    this.retryCount < this.maxRetry && this.initSocket();
    this.retryCount++;
  }
  destroy() {
    this.socket.close();
  }
}

export default Socket;
