import { combineReducers } from 'redux';

import profile from './profile';
import users from './users';
import posts from './posts';
import dialogPage from './dialogPage';
import dialogsList from './dialogsList';
import news from './news';
import postPage from './postPage';
import auth from './auth';

const rootReducer = combineReducers({
  users,
  posts,
  profile,
  dialogPage,
  dialogsList,
  news,
  postPage,
  auth
});

export default rootReducer;