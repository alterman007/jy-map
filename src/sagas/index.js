import { all } from 'redux-saga/effects';
import alarmHistory from './alarmHistory';
import forceHistory from './forceHistory';
import map from './map';
import cpmStatus from './cpmStatus';

const AllForks = [
  alarmHistory,
  forceHistory,
  map,
  cpmStatus
];

export default function* root() {
  yield all(AllForks);
}
