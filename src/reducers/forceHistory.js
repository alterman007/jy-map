import { handleActions } from 'redux-actions';
import {
  toggleForceHistoryVisible,
  setForceHistoryList,
  setForceHistoryListIsSelected
} from '../actions/forceHistory';

const defaultState = {
  visible: false,
  list: [],
  // detailId: null,
};

const forceHistory = handleActions(
  {
    [toggleForceHistoryVisible](state, { payload }) {
      const visible = typeof payload === 'boolean' ? payload : !state.visible;
      return { ...state, visible, detailId: null };
    },
    [setForceHistoryList](state, { payload }) {
      return Array.isArray(payload) ? { ...state, list: payload } : state;
    },
    [setForceHistoryListIsSelected](state, { payload }) {
      return { ...state, list: payload }
    }
  },
  defaultState,
);

export default forceHistory;
