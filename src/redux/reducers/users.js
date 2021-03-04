import {
  SET_USERS, SET_CURRENT_PAGE, SET_LOADER, TOGGLE_IS_FOLLOWING_PROGRESS,
  FOLLOW, UNFOLLOW
} from '../actionsTypes/actionsTypes';

let initialState = {
  users: [],
  pageSize: 12,
  totalUsersCount: 99,
  currentPage: 1,
  preloader: true,
  followingLoading: [],
  pagination: false
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
        preloader: false,
      }
    }
    case SET_LOADER: {
      return {
        ...state,
        preloader: action.val,
      }
    }
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map(el => {
          if (el.id === action.id) {
            return { ...el, followed: true }
          }
          return el;
        })
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map(el => {
          if (el.id === action.id) {
            return { ...el, followed: false }
          }
          return el;
        })
      }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingLoading: action.val
          ? [...state.followingLoading, action.id]
          : state.followingLoading.filter(el => el !== action.id)
      }
    default:
      return state;
  }
}

export default users;