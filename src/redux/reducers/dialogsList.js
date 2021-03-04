import {
  SET_DIALOGS_LIST
} from '../actionsTypes/actionsTypes';


let initialState = {
  list: [],
  preloader: false,
};

const dialogsList = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOGS_LIST:
      const dialogsListArr = action.list.filter(el => el.dialogs.length > 0);
      return {
        ...state,
        list: [...dialogsListArr.reverse()],
        preloader: false
      }
    default:
      return state;
  }
}

export default dialogsList;