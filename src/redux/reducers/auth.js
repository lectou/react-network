import {
  SET_AUTH
} from '../actionsTypes/actionsTypes';

let initalState = {
  userId: null,
  name: null,
  isAuth: false
}

const auth = (state = initalState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.val
      }
    default:
      return state
  }
};

export default auth;