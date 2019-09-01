import React from 'react';
import Map from './containers/Map';
import Switcher from './containers/Switcher';
import Header from './components/Header';
import RealTimeAlarm from './containers/RealTimeAlarm';
import PoliceCall from './containers/PoliceCall';
import NetworkForceHistory from './containers/NetworkForceHistory';
import NetworkAlarmHistory from './containers/NetworkAlarmHistory';
import HistorySwitcher from './containers/HistorySwitcher';
import ForceDetailControl from './containers/ForceDetailControl';
import AlarmDetailControl from './containers/AlarmDetailControl';

import './App.styl';

function App() {
  return (
    <div className="app-root">
      <Map />
      <div className="content">
        <Header />
        <Switcher />
        <RealTimeAlarm />
        <PoliceCall />
        <NetworkForceHistory />
        <NetworkAlarmHistory />
        <HistorySwitcher />
        <ForceDetailControl />
        <AlarmDetailControl />
      </div>
    </div>
  );
}

export default App;
