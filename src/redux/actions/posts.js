import { postsAPI } from '../../api/api';
import {
  SET_POSTS, SET_LOADER, SET_NEW_POST,
  SET_POST, DELETE_MY_POST
} from '../actionsTypes/actionsTypes';


const setPostsData = (posts) => ({ type: SET_POSTS, posts });
const onLoader = (val) => ({ type: SET_LOADER, val });
const setNewDataPost = (post) => ({ type: SET_NEW_POST, post });
const deleteMyPost = (id) => ({ type: DELETE_MY_POST, id });


export const getPost = (id) => ({ type: SET_POST, id });

export const getPostsData = () => async dispatch => {

  dispatch(onLoader(true));
  const posts = await postsAPI.getPosts();
  dispatch(setPostsData(posts))

}

export const setNewPostData = (post) => async dispatch => {
  await postsAPI.setNewPost(post);
  dispatch(setNewDataPost(post))
}

export const deletePostData = (id) => async dispatch => {
  await postsAPI.deletePost(id);
  dispatch(deleteMyPost(id));
}