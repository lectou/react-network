import {
  SET_DIALOG,
  SET_LOADER,
  SET_MY_MESSAGE
} from '../actionsTypes/actionsTypes';


let initialState = {
  name: null,
  id: null,
  status: null,
  photo: null,
  dialogs: [],
  preloader: false,
  deleteTextLoading: []
};


const dialogPage = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG: {
      const { name, id, status, photo, dialogs } = action.dialog
      return {
        ...state,
        name: name,
        id: id,
        status: status,
        photo: photo,
        dialogs: [...dialogs],
        preloader: false,
      }
    }
    case SET_LOADER: {
      return {
        ...state,
        preloader: action.val,
      }
    }
    case SET_MY_MESSAGE: {
      return {
        ...state,
        dialogs: [...state.dialogs, action.message]
      }
    }

    default:
      return state;
  }
}

export default dialogPage;