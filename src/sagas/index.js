import { all } from 'redux-saga/effects';
import alarmHistory from './alarmHistory';
import forceHistory from './forceHistory';
import map from './map';

const AllForks = [
  alarmHistory,
  forceHistory,
  map,
];

export default function* root() {
  yield all(AllForks);
}
