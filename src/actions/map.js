import { createAction } from 'redux-actions';
// import { createHttpAction } from './util';
import {
  SET_MAP_PATH,
  SELECT_REAL_TIME_MARKER,
  SET_REAL_TIME_MARKERS,
} from '../constants/actionTypes';

export const setRealTimeMarkers = createAction(SET_REAL_TIME_MARKERS);
export const selectRealTimeMarker = createAction(SELECT_REAL_TIME_MARKER);
export const setMapPath = createAction(SET_MAP_PATH);
