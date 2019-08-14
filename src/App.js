import React from 'react';
import Map from './containers/Map';
import Header from './components/Header';
import RealTimeAlarm from './containers/RealTimeAlarm';
import NetworkAlarmHistory from './containers/NetworkAlarmHistory';

import './App.styl';

function App() {
  return (
    <div className="app-root">
      <Map />
      <div className="content">
        <Header />
        <RealTimeAlarm />
        <NetworkAlarmHistory />
      </div>
    </div>
  );
}

export default App;
