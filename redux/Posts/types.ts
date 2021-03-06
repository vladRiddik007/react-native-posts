import { Post } from "../../types";

export const GET_POSTS_STARTED = "GET_POSTS_STARTED";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_ERROR = "GET_POSTS_ERROR";

export interface postsError {
  type: typeof GET_POSTS_ERROR;
}
export interface postsStart {
  type: typeof GET_POSTS_STARTED;
}
export interface postsSuccess {
  type: typeof GET_POSTS_SUCCESS;
  payload: Post[];
}

export type ActionTypes = postsError | postsSuccess | postsStart;

export type DispatchType = (args: ActionTypes) => ActionTypes;
