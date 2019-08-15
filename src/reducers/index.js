import { combineReducers } from 'redux';
import alarmHistory from './alarmHistory';
import forceHistory from './forceHistory';
import map from './map';

const rootReducer = combineReducers({
  alarmHistory,
  forceHistory,
  map,
});

export default rootReducer;
