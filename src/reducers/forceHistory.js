import { handleActions } from 'redux-actions';
import {
  toggleForceHistoryVisible,
  setForceHistoryList,
  selectForceItem,
} from '../actions/forceHistory';

const defaultState = {
  visible: true,
  list: [],
  detailId: null,
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
    [selectForceItem](state, { payload }) {
      // console.log(payload);
      return { ...state, detailId: payload.id || payload };
    },
  },
  defaultState,
);

export default forceHistory;
