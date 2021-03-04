import { dialogsAPI } from '../../api/api';
import {
  SET_DIALOG,
  SET_LOADER,
  SET_MY_MESSAGE
} from '../actionsTypes/actionsTypes';

const setDialog = (dialog) => ({ type: SET_DIALOG, dialog });
const onLoader = (val) => ({ type: SET_LOADER, val });
const setMyMessage = (message) => ({ type: SET_MY_MESSAGE, message });

export const setDialogData = (id) => async dispatch => {
  dispatch(onLoader(true));
  const dialog = await dialogsAPI.getDialog(id);
  dispatch(setDialog(dialog));
}

export const setNewMessage = (message) => async dispatch => {
  await dialogsAPI.setMessage(message);
  dispatch(setMyMessage(message));
}