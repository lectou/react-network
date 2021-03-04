import {
  SET_POSTS, SET_LOADER, SET_POST,
  SET_NEW_POST, DELETE_MY_POST
} from '../actionsTypes/actionsTypes';

let inintialState = {
  comments: [],
  posts: [],
  preloader: false,
  deleteLoading: [],
  post: {
    image: null,
    title: null,
    text: null,
    date: null,
    id: null
  }
};


const posts = (state = inintialState, action) => {
  switch (action.type) {

    case SET_POSTS: {
      return {
        ...state,
        posts: action.posts.reverse(),
        preloader: false,
      }
    }
    case SET_POST: {
      const filterPosts = state.posts.filter(post => post.id === action.id)[0];
      // console.log(filterPosts);
      return {
        ...state,
        post: {
          image: filterPosts.image,
          title: filterPosts.title,
          text: filterPosts.text,
          date: filterPosts.date,
          id: filterPosts.id
        }
      }
    }
    case SET_LOADER: {
      return {
        ...state,
        preloader: action.val,
      }
    }
    case SET_NEW_POST: {
      return {
        ...state,
        posts: [action.post, ...state.posts]
      }
    }
    case DELETE_MY_POST: {
      const newPostArr = state.posts.filter(el => el.id !== action.id)
      return {
        ...state,
        posts: [...newPostArr]
      }
    }

    default:
      return state;
  }
}

export default posts;