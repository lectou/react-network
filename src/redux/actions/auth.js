import { authAPI } from '../../api/api';
import {
  SET_AUTH
} from '../actionsTypes/actionsTypes';


const setAuth = (val) => ({ type: SET_AUTH, val });

export const logout = () => ({ type: SET_AUTH, val: false })

export const authData = (name, password) => async dispatch => {

  const authData = await authAPI.login();

  if (authData.name === name && authData.password === password) {
    dispatch(setAuth(true))
  } else {
    alert("Wrong password or login");
  }
}
