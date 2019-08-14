import { handleActions } from 'redux-actions';
import {
  toggleForceHistoryVisible,
  setForceHistoryList,
} from '../actions/forceHistory';

const defaultState = {
  visible: true,
  list: [],
};

const forceHistory = handleActions(
  {
    [toggleForceHistoryVisible](state, { payload }) {
      const visible = typeof payload === 'boolean' ? payload : !state.visible;
      return { ...state, visible };
    },
    [setForceHistoryList](state, { payload }) {
      console.log(payload);
      return Array.isArray(payload) ? { ...state, list: payload } : state;
    },
  },
  defaultState,
);

export default forceHistory;
