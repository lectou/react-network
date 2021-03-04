import { profileAPI } from '../../api/api';
import {
  SET_POST_DATA, UPDATE_PROFILE, SET_LOADER, UPDATE_PHOTO
} from '../actionsTypes/actionsTypes';


const setProfile = (profile) => ({ type: SET_POST_DATA, profile });
const setUpdateProfile = (profile) => ({ type: UPDATE_PROFILE, profile });
const onLoader = (val) => ({ type: SET_LOADER, val });
const updateProfilePhoto = (url) => ({ type: UPDATE_PHOTO, url });

export const getProfile = () => async dispatch => {
  const getProfileData = await profileAPI.getProfile();
  dispatch(setProfile(getProfileData));
}

export const updateProfile = (profile) => async dispatch => {
  dispatch(onLoader(true));
  const { name, email, aboutMe, status, info } = profile;
  await profileAPI.setProfile(name, email, aboutMe, status, info);
  dispatch(setUpdateProfile(profile));

}

export const updatePhoto = (url) => async dispatch => {
  dispatch(onLoader(true));
  await profileAPI.setProfilePhoto(url)
  dispatch(updateProfilePhoto(url));
  console.log(url);

}