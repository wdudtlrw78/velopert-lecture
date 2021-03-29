import * as postsAPI from '../api/posts';
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

// getPosts
const GET_POSTS = 'posts/GET_POSTS';
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'posrs/GET_POSTS_ERROR';

// getPostById
const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_ERROR = 'posts/GET_POST_ERROR';

// thunk function
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
}

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts');
const getPostReducer = handleAsyncActions(GET_POST, 'post');

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
    default:
      return state;
  }
}