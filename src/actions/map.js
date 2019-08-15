import { createAction } from 'redux-actions';
// import { createHttpAction } from './util';
import {
  SET_MAP_PATH
} from '../constants/actionTypes';

export const setMapPath = createAction(SET_MAP_PATH);
