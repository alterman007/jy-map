import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale-provider/zh_CN';
import rootSagas from './sagas';

import rootReducer from './reducers';
import configStore from './configStore';

import 'moment/locale/zh-cn';
import './core/initLeaflet';

moment.locale('zh-cn');

const store = configStore(rootReducer, rootSagas);

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
