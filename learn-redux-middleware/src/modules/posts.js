import * as postsAPI from '../api/posts';
import { createPromiseSaga, createPromiseSagaById, createPromiseThunk, createPromiseThunkById, handleAsyncActions, handleAsyncActionsById, reducerUtils } from '../lib/asyncUtils';
import { call, put, takeEvery, getContext } from 'redux-saga/effects';

// getPosts
const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'posrs/GET_POSTS_ERROR';

// getPostById
const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_ERROR = 'posts/GET_POST_ERROR';

const GO_TO_HOME = 'GO_TO_HOME';

const CLEAR_POST = 'CLEAR_POST'

// // thunk function
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

// Saga function
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id,
});

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

// 모니터링 작업
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
}

function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}

// Thunk
// export const goToHom = () => (dispatch, getState, {history}) => {
//   history.push('/');
// }

// Saga
export const goToHome = () => ({ type: GO_TO_HOME })


export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  posts: reducerUtils.initial(),
  post: {}
}

// 3번째 para(true) = 로딩중에 데이터를 초기화하지않겠다 기존 데이터있으면 재사용하겠다.
const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActionsById(GET_POST, 'post', true);

export default function posts(state = initialState, action) {
  switch(action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS: 
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial()
      }
    default:
      return state;
  }
}