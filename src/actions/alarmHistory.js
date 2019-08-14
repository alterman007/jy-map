import { createAction } from 'redux-actions';

import {
  TOGGLE_ALARM_HISTORY_VISIBLE,
} from '../constants/actionTypes';

export const toggleAlarmHistoryVisible = createAction(TOGGLE_ALARM_HISTORY_VISIBLE);
