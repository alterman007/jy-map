import { createAction } from 'redux-actions';
import { createHttpAction } from './util';
import {
  TOGGLE_FORCE_HISTORY_VISIBLE,
  SET_FORCE_HISTORY_LIST,
  HTTP_FETCH_FORCE_HISTORY,
} from '../constants/actionTypes';

export const toggleForceHistoryVisible = createAction(TOGGLE_FORCE_HISTORY_VISIBLE);
export const setForceHistoryList = createAction(SET_FORCE_HISTORY_LIST);
export const fetchForceHistory = createHttpAction(HTTP_FETCH_FORCE_HISTORY);
