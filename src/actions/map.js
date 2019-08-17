import { createAction } from 'redux-actions';
// import { createHttpAction } from './util';
import {
  SET_MAP_PATH,
  SELECT_REAL_TIME_MARKER,
} from '../constants/actionTypes';

export const selectRealTimeMarker = createAction(SELECT_REAL_TIME_MARKER);
export const setMapPath = createAction(SET_MAP_PATH);
