import { Post } from "../../types";
import {
  ActionTypes,
  GET_POSTS_ERROR,
  GET_POSTS_STARTED,
  GET_POSTS_SUCCESS,
} from "./types";

interface IState {
  posts: Array<Post>;
  loading: boolean;
  error: boolean;
}

const INITIAL_STATE: IState = {
  posts: [],
  loading: false,
  error: false,
};

export const postsReducer = (
  state = INITIAL_STATE,
  action: ActionTypes
): IState => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_POSTS_STARTED:
      newState.loading = true;
      break;
    case GET_POSTS_SUCCESS:
      newState.loading = false;
      newState.posts = action.payload;
      break;
    case GET_POSTS_ERROR:
      newState.loading = false;
      newState.error = true;
      break;
    default: {
      break;
    }
  }

  return newState;
};
