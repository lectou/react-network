const initialState = {
  items: [],
  preloader: false
};

const search = (state = initialState, action) => {
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
    default:
      return state;
  }
}


export default search;