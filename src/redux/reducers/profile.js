import {
  SET_POST_DATA, UPDATE_PROFILE, SET_LOADER, UPDATE_PHOTO
} from '../actionsTypes/actionsTypes';

const inintialState = {
  name: null,
  email: null,
  aboutMe: null,
  status: null,
  id: null,
  photo: null,
  info: null,
  preloader: false

}

const profile = (state = inintialState, action) => {

  switch (action.type) {
    case SET_POST_DATA: {
      const { name, email, aboutMe, status, id, photo, info } = action.profile
      return {
        ...state,
        name: name,
        email: email,
        aboutMe: aboutMe,
        status: status,
        id: id,
        photo: photo,
        info: info,
        preloader: false
      }
    }
    case UPDATE_PROFILE: {
      const { name, email, aboutMe, status, info } = action.profile
      return {
        ...state,
        name: name,
        email: email,
        aboutMe: aboutMe,
        status: status,
        info: info,
        preloader: false
      }
    }
    case UPDATE_PHOTO: {
      return {
        ...state,
        photo: action.url,
        preloader: false
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


export default profile;