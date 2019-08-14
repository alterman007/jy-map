import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale/zh_CN';

import rootReducer from './reducers';
import configStore from './configStore';

import './core/initLeaflet';

const store = configStore(rootReducer);

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
