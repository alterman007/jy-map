import { createAction } from 'redux-actions';
import { createHttpAction } from './util';
import {
  TOGGLE_FORCE_HISTORY_VISIBLE,
  SET_FORCE_HISTORY_LIST,
  HTTP_FETCH_FORCE_HISTORY,
  HTTP_FETCH_FORCE_PATH,
  SELECT_FORCE_HISTORY_ITEM,
  SET_FORCE_HISTORY_LIST_ISSELECTED
} from '../constants/actionTypes';

export const selectForceHistoryItem = createAction(SELECT_FORCE_HISTORY_ITEM);
export const toggleForceHistoryVisible = createAction(TOGGLE_FORCE_HISTORY_VISIBLE);
export const setForceHistoryList = createAction(SET_FORCE_HISTORY_LIST);
export const fetchForceHistory = createHttpAction(HTTP_FETCH_FORCE_HISTORY);
export const fetchForcePath = createHttpAction(HTTP_FETCH_FORCE_PATH);
export const setForceHistoryListIsSelected = createAction(SET_FORCE_HISTORY_LIST_ISSELECTED);
