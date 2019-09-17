import { createAction } from 'redux-actions';
// import { createHttpAction } from './util';
import {
  SET_MAP_PATH,
  SELECT_REAL_TIME_MARKER,
  SET_REAL_TIME_MARKERS,
  SET_PATH_MOVE_FLAG,
  SET_ALARM_HISTORY_DETAIL,
  SET_MAP_ZOOM,
  HTTP_FETCH_TRAIL,
  SET_MAP_TRAIL,
  SET_MAP_PCSAREA,
  HTTP_MAP_PCSAREA,
  HTTP_FETCH_RADIO,
  SET_RADIO_TRALL,
  SET_PATROL_AREA_DATA
} from '../constants/actionTypes';
import { createHttpAction } from './util';

export const setRealTimeMarkers = createAction(SET_REAL_TIME_MARKERS);
export const selectRealTimeMarker = createAction(SELECT_REAL_TIME_MARKER);
export const setMapPath = createAction(SET_MAP_PATH);
export const setMoveFlag = createAction(SET_PATH_MOVE_FLAG);
export const setAlarmHistoryDetail = createAction(SET_ALARM_HISTORY_DETAIL);
export const setMapZoom = createAction(SET_MAP_ZOOM);
export const fetchMapTrail = createHttpAction(HTTP_FETCH_TRAIL);
export const setMapTrail = createAction(SET_MAP_TRAIL);
export const fetchMapPCSArea = createHttpAction(HTTP_MAP_PCSAREA);
export const setMapPCSArea = createAction(SET_MAP_PCSAREA);
export const fetchRadioTrall = createHttpAction(HTTP_FETCH_RADIO);
export const setRadioTrall = createAction(SET_RADIO_TRALL);
export const setPatrolAreaData = createAction(SET_PATROL_AREA_DATA);
