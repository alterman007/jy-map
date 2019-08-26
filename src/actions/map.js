import { createAction } from 'redux-actions';
// import { createHttpAction } from './util';
import {
  SET_MAP_PATH,
  SELECT_REAL_TIME_MARKER,
  SET_REAL_TIME_MARKERS,
  SET_PATH_MOVE_FLAG,
  SET_ALARM_HISTORY_DETAIL,
  SET_MAP_ZOOM
} from '../constants/actionTypes';

export const setRealTimeMarkers = createAction(SET_REAL_TIME_MARKERS);
export const selectRealTimeMarker = createAction(SELECT_REAL_TIME_MARKER);
export const setMapPath = createAction(SET_MAP_PATH);
export const setMoveFlag = createAction(SET_PATH_MOVE_FLAG);
export const setAlarmHistoryDetail = createAction(SET_ALARM_HISTORY_DETAIL);
export const setMapZoom = createAction(SET_MAP_ZOOM);
