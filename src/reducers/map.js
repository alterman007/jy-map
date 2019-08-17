import { handleActions } from 'redux-actions';
import {
  setMapPath,
  selectRealTimeMarker,
} from '../actions/map';
import {
  toggleForceHistoryVisible,
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
  // type: 1 车辆 2 单兵 3 wifi 4 电台
  realTimeMarkers: [
    { type: 1, lng: 121.267776, lat: 31.205900, name: '沪A3456', id: 1 },
    { type: 2, lng: 121.375985, lat: 31.254194, name: '单兵装备', id: 2 },
    { type: 3, lng: 121.256683, lat: 31.238638, name: '笑傲江湖', id: 3 },
    { type: 4, lng: 121.368088, lat: 31.212068, name: '手持电台', id: 4 },
    { type: 1, lng: 121.338219, lat: 31.281926, name: '沪A1257', id: 5 },
  ],
  center: { lng: 121.331696, lat: 31.238858 },
  // 点击的marker，指向realTimeMarker对应数据ID
  selectedMarkerID: null,
  movePath: null,
};

const map = handleActions(
  {
    [selectRealTimeMarker](state, { payload }) {
      return { ...state, selectedMarkerID: (payload && payload.id) || payload };
    },
    [setMapPath](state, { payload }) {
      return { ...state, movePath: payload ? convertDataToGeojson(payload, 'lineString'): null };
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
