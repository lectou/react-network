import { newsAPI } from '../../api/api';
import { SET_LOADER, SET_NEWS } from '../actionsTypes/actionsTypes';


const onLoader = (val) => ({ type: SET_LOADER, val });
const setNews = (news) => ({ type: SET_NEWS, news });

export const getNewsData = () => async dispatch => {
  dispatch(onLoader(true));
  const news = await newsAPI.getNews();
  dispatch(setNews(news));
}