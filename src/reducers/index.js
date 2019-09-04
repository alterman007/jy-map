import { combineReducers } from 'redux';
import alarmHistory from './alarmHistory';
import forceHistory from './forceHistory';
import cmpStatus from './cmpStatus';
import map from './map';

const rootReducer = combineReducers({
  alarmHistory,
  forceHistory,
  map,
  cmpStatus
});

export default rootReducer;
