import { usersAPI } from '../../api/api';
import {
  SET_USERS, SET_CURRENT_PAGE, SET_LOADER, TOGGLE_IS_FOLLOWING_PROGRESS,
  FOLLOW, UNFOLLOW
} from '../actionsTypes/actionsTypes';


const setUsers = (users) => ({ type: SET_USERS, users });
const onLoader = (val) => ({ type: SET_LOADER, val });
const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
const setFollowingLoading = (id, val) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, id, val });
const setFollow = (id) => ({ type: FOLLOW, id });
const setUnFollow = (id) => ({ type: UNFOLLOW, id });


export const getUsersData = (currentPage, pageSize) => async (dispatch) => {

  dispatch(onLoader(true));
  const users = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(setUsers(users)); // get users
  dispatch(setCurrentPage(currentPage)); // active number pagination
}

export const follow = (id) => async (dispatch) => {
  dispatch(setFollowingLoading(id, true));
  await usersAPI.userFollow(id, true);
  dispatch(setFollow(id));
  dispatch(setFollowingLoading(id, false))
}

export const unFollow = (id) => async (dispatch) => {
  dispatch(setFollowingLoading(id, true));
  await usersAPI.userFollow(id, false);
  dispatch(setUnFollow(id));
  dispatch(setFollowingLoading(id, false))
}