import { commentsAPI, postsAPI } from '../../api/api';

import {
  SET_LOADER,
  SET_DIALOG_COMMENTS,
  SET_NEW_COMMENT
} from '../actionsTypes/actionsTypes';

const setPostsComments = (data) => ({ type: SET_DIALOG_COMMENTS, data });
const onLoader = (val) => ({ type: SET_LOADER, val });
const setComment = (comment) => ({ type: SET_NEW_COMMENT, comment })



export const getPostsComments = (id) => async dispatch => {
  dispatch(onLoader(true));
  const dataPosts = await postsAPI.getPostsCommentsData(id);
  dispatch(setPostsComments(dataPosts));
}

export const setNewComment = (comment) => async dispatch => {
  await commentsAPI.setNewComment(comment);
  dispatch(setComment(comment));

}