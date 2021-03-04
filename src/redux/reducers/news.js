import { SET_LOADER, SET_NEWS } from '../actionsTypes/actionsTypes';

const initialState = {
  news: [],
  preloader: false
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS: {
      return {
        ...state,
        news: [...action.news.map(el => {
          const newObj = { ...el, newsId: Math.random().toString(36).substr(2, 9) }
          return newObj;
        })],
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


export default news;