import React from 'react';
import Map from './containers/Map';
import Header from './components/Header';
import RealTimeAlarm from './containers/RealTimeAlarm';
import NetworkForceHistory from './containers/NetworkForceHistory';
import NetworkAlarmHistory from './containers/NetworkAlarmHistory';
import HistorySwitcher from './containers/HistorySwitcher';
import ForceDetail from './containers/ForceDetail';
import ForceSnapshot from './containers/ForceSnapshot';

import './App.styl';

function App() {
  return (
    <div className="app-root">
      <Map />
      <div className="content">
        <Header />
        <RealTimeAlarm />
        <NetworkForceHistory />
        <NetworkAlarmHistory />
        <HistorySwitcher />
        <ForceDetail />
        <ForceSnapshot />
      </div>
    </div>
  );
}

export default App;
