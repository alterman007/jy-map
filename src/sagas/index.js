import { all } from 'redux-saga/effects';
import alarmHistory from './alarmHistory';
import forceHistory from './forceHistory';

const AllForks = [
  alarmHistory,
  forceHistory,
];

export default function* root() {
  yield all(AllForks);
}
