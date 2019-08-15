import { handleActions } from 'redux-actions';
import {
  setMapPath,
} from '../actions/map';
import {
  toggleForceHistoryVisible,
  selectForceItem,
} from '../actions/forceHistory';
import {
  toggleAlarmHistoryVisible,
} from '../actions/alarmHistory';
import {
  convertDataToGeojson,
} from '../utils/map';

const defaultState = {
  carPoints: [
    { type: 'car', lng: 121.375985, lat: 31.254194, name: '沪A123456' },
    { type: 'car', lng: 121.256683, lat: 31.238638, name: '沪A123456' },
    { type: 'car', lng: 121.368088, lat: 31.212068, name: '沪A123456' },
    { type: 'car', lng: 121.338219, lat: 31.281926, name: '沪A123456' },
  ],
  peoplePoints: [
    { type: 'people', lat: 31.205900, lng: 121.267776, name: '笑傲江湖' },
    { type: 'people', lat: 31.191070, lng: 121.412315, name: '天龙八部' },
    { type: 'people', lat: 31.238494, lng: 121.320642, name: '铁血丹心' },
    { type: 'people', lat: 31.275029, lng: 121.254558, name: '神雕侠侣' },
  ],
  center: { lng: 121.331696, lat: 31.238858 },
  movePath: null,
};

const map = handleActions(
  {
    [setMapPath](state, { payload }) {
      return { ...state, movePath: convertDataToGeojson(payload, 'lineString') };
    },
    [selectForceItem](state) {
      return { ...state, movePath: null };
    },
    [toggleForceHistoryVisible](state) {
      return { ...state, movePath: null };
    },
    [toggleAlarmHistoryVisible](state) {
      return { ...state, movePath: null };
    },
  },
  defaultState,
);

export default map;
