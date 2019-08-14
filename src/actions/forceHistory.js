import { createAction } from 'redux-actions';

import {
  TOGGLE_FORCE_HISTORY_VISIBLE,
} from '../constants/actionTypes';

export const toggleForceHistoryVisible = createAction(TOGGLE_FORCE_HISTORY_VISIBLE);
