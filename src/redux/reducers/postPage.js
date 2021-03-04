import {
  SET_LOADER,
  SET_DIALOG_COMMENTS,
  SET_NEW_COMMENT
} from '../actionsTypes/actionsTypes';


let initialState = {
  title: null,
  text: null,
  date: null,
  image: null,
  id: null,
  comments: [],
  preloader: false,
};


const postPage = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG_COMMENTS: {
      const { image, title, text, date, id, comments } = action.data
      return {
        ...state,
        title: title,
        text: text,
        date: date,
        image: image,
        id: id,
        comments: [...comments],
        preloader: false,
      }
    }
    case SET_NEW_COMMENT: {

      return {
        ...state,
        comments: [...state.comments, action.comment],
      }
    }
    case SET_LOADER: {
      return {
        ...state,
        preloader: action.val,
      }
    }

    default:
      return state;
  }
}

export default postPage;