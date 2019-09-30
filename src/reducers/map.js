import { handleActions } from 'redux-actions';
import {
  setMapPath,
  setMoveFlag,
  selectRealTimeMarker,
  setRealTimeMarkers,
  setAlarmHistoryDetail,
  setMapZoom,
  setMapTrail,
  setMapPCSArea,
  setRadioTrall,
  setPatrolAreaData
} from '../actions/map';
import {
  toggleForceHistoryVisible,
  selectForceHistoryItem,
} from '../actions/forceHistory';
import {
  toggleAlarmHistoryVisible,
  selectAlarmItem,
} from '../actions/alarmHistory';
import {
  convertDataToGeojson,
} from '../utils/map';
import {
  setIshowCarMarkers, setIshowRadioMarkers, setIshowHeatLayers, setIshowMonitorMarkers,
  setIshowPatrolArea
} from '../actions/cpmStatus';
import { realArea } from '@/utils/func';

const center = realArea ? realArea.properties.center : undefined;

const defaultState = {
  carMarkers: [
    // {type: 1, wificount: 42, lat: 31.240578, lng: 121.320737, name: 'A7672', id: 'aaa',pcs: '江桥派出所'}
    // { type: 'car', lng: 121.375985, lat: 31.254194, name: '沪A123456',indexCode: "1111",id: 1},
    // { type: 'car', lng: 121.256683, lat: 31.238638, name: '沪A123456',indexCode: "1111",id: 2 },
    // { type: 'car', lng: 121.368088, lat: 31.212068, name: '沪A123456',indexCode: "1111", id: 3 },
    // { type: 'car', lng: 121.338219, lat: 31.281926, name: '沪A123456',indexCode: "1111", id: 4 },
  ],
  radioMarkers: [
    // { type: 3, lng: 121.368088, lat: 31.212068, name: '手持电台', id: 4 },
  ],
  peoplePoints: [
    // { type: 'people', lat: 31.205900, lng: 121.267776, name: '笑傲江湖' },
    // { type: 'people', lat: 31.191070, lng: 121.412315, name: '天龙八部' },
    // { type: 'people', lat: 31.238494, lng: 121.320642, name: '铁血丹心' },
    // { type: 'people', lat: 31.275029, lng: 121.254558, name: '神雕侠侣' },
  ],
  // type: 1 车辆 2 单兵 3 wifi 4 电台
  realTimeMarkers: [
    // { type: 1, lng: 121.267776, lat: 31.205900, name: '沪A3456', id: 1 },
    // { type: 2, lng: 121.375985, lat: 31.254194, name: '单兵装备', id: 2 },
    // { type: 3, lng: 121.256683, lat: 31.238638, name: '笑傲江湖', id: 3 },
    // { type: 4, lng: 121.368088, lat: 31.212068, name: '手持电台', id: 4 },
    // { type: 1, lng: 121.338219, lat: 31.281926, name: '沪A1257', id: 5 },
  ],
  forceHistoryMarker: null,
  center: center ? { lng: center[0], lat: center[1] } : { lng: 121.331696, lat: 31.238858 },
  // 点击的marker，指向realTimeMarker对应数据ID
  // 点击历史条目，指向对应数据
  selectedMarkerID: null,
  movePath: null,
  moveFlag: false,
  alarmMarker: null,
  showAlarmHistoryDetail: null,
  mapzoom: null,
  pcsArea: [],

  iShowCarMarkers: false, //是否显示车辆
  iShowHeatLayers: false,
  iShowRadioMarkers: false, //是否显示电台
  iShowMonitorMarkers: false, // 是否显示监控固定点位
  iShowNetworkAlarmHistory: false,
  iShowNetWorkForceHistory: false,
  iShowPatrolArea: false, // 是否显示巡逻区域

  patrolArea: [], // 巡逻线路
  cruiseLine: [], // 主巡线路
  signInMarkers: []// 派出所签到markers
};

const map = handleActions(
  {
    [setPatrolAreaData](state, { payload }) {
      return { ...state, patrolArea: payload.patrolArea, cruiseLine: payload.cruiseLine, signInMarkers: payload.signInMarkers}
    },
    [setIshowPatrolArea](state) {
      return { ...state, iShowPatrolArea: !state.iShowPatrolArea }
    },
    [setIshowCarMarkers](state, {payload}) { // 设置是否显示实时车辆点位
      return typeof payload === 'boolean' ? {
        ...state, iShowCarMarkers: payload
      } : { ...state, iShowCarMarkers: !state.iShowCarMarkers }
    },
    [setMapTrail](state, { payload }) {
      // return { ...state, realTimeMarkers: payload };
      return { ...state, carMarkers: payload }
    },
    [setRadioTrall](state, { payload }) {
      return { ...state, radioMarkers: payload }
    },
    [setIshowRadioMarkers](state) {
      return { ...state, iShowRadioMarkers: !state.iShowRadioMarkers }
    },
    [setIshowHeatLayers](state) {
      return { ...state, iShowHeatLayers: !state.iShowHeatLayers }
    },
    [setIshowMonitorMarkers](state) {
      return { ...state, iShowMonitorMarkers: !state.iShowMonitorMarkers }
    },
    [setMapPCSArea](state, { payload }) {
      return { ...state, pcsArea: payload }
    },
    [setRealTimeMarkers](state, { payload }) {
      return { ...state, realTimeMarkers: payload };
    },
    [selectRealTimeMarker](state, { payload }) {
      return { ...state, selectedMarkerID: payload };
    },
    [selectForceHistoryItem](state, { payload }) {
      if (payload) {
        return { ...state, forceHistoryMarker: payload, center: { lng: payload.lng, lat: payload.lat } };
      }
      return { ...state, forceHistoryMarker: payload };
    },
    [setMapPath](state, { payload }) {
      return { ...state, movePath: payload ? convertDataToGeojson(payload, 'lineString') : null };
    },
    [toggleForceHistoryVisible](state) {
      return { ...state, movePath: null, forceHistoryMarker: null, showAlarmHistoryDetail: null, selectedMarkerID: null, alarmMarker: null };
    },
    [toggleAlarmHistoryVisible](state) {
      return { ...state, movePath: null, forceHistoryMarker: null, showAlarmHistoryDetail: null, selectedMarkerID: null, alarmMarker: null };
    },
    [setMoveFlag](state, { payload }) {
      return { ...state, moveFlag: payload };
    },
    [selectAlarmItem](state, { payload }) {
      const newState = { ...state, alarmMarker: payload, forceHistoryMarker: null, selectedMarkerID: null, movePath: null };
      if (payload) {
        newState.center = { lng: payload.lng, lat: payload.lat };
      }
      return newState;
    },
    [setAlarmHistoryDetail](state, { payload }) {
      return { ...state, showAlarmHistoryDetail: payload }
    },
    [setMapZoom](state, { payload }) {
      return { ...state, mapzoom: payload }
    }
  },
  defaultState,
);

export default map;
