import { dialogsAPI } from '../../api/api';
import {
  SET_DIALOGS_LIST
} from '../actionsTypes/actionsTypes';

const setList = (list) => ({ type: SET_DIALOGS_LIST, list });

export const getDialogslist = () => async dispatch => {
  const list = await dialogsAPI.getDialogs();
  dispatch(setList(list));
}

