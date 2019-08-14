import { combineReducers } from 'redux';
import alarmHistory from './alarmHistory';
import forceHistory from './forceHistory';

const rootReducer = combineReducers({
  alarmHistory,
  forceHistory,
});

export default rootReducer;
