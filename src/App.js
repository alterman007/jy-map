import React from 'react';
import Map from './containers/Map';
import Header from './components/Header';
import RealTimeAlarm from './containers/RealTimeAlarm';
import PoliceCall from './containers/PoliceCall';
import NetworkForceHistory from './containers/NetworkForceHistory';
import NetworkAlarmHistory from './containers/NetworkAlarmHistory';
import HistorySwitcher from './containers/HistorySwitcher';
import ForceDetailControl from './containers/ForceDetailControl';
import AlarmDetailControl from './containers/AlarmDetailControl';
import Switcher from './containers/Switcher';
import './App.styl';
import PCSPoliceCallModal from './components/PCSPoliceCallModal';

function App() {
  return (
    <div className="app-root">
      <Map />
      <div className="content">
        <Header />
        <RealTimeAlarm />
        <PoliceCall />
        <NetworkForceHistory />
        <NetworkAlarmHistory />
        <HistorySwitcher />
        <ForceDetailControl />
        <AlarmDetailControl />
        {/* <Switcher /> */}
        {/* <PCSPoliceCallModal /> */}
      </div>
    </div>
  );
}

export default App;
