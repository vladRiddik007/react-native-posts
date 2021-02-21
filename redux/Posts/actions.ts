import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Post } from "../../types";
import { ApiGet } from "../../utils/api";
import { RootState } from "../rootReducer";
import {
  GET_POSTS_ERROR,
  GET_POSTS_STARTED,
  GET_POSTS_SUCCESS,
  DispatchType,
  ActionTypes,
} from "./types";

export const postsGet = (
  params: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(postsStarted());
  return await ApiGet(`${params}`)
    .then(async (response) => {
      const data = await response.json();
      dispatch(postsSuccess(data));
    })
    .catch((error) => {
      console.error("There was an error!", error);
      dispatch(postsError());
    });
};

export function postsError(): any {
  const action: ActionTypes = {
    type: GET_POSTS_ERROR,
  };
  return middleware(action);
}
export function postsStarted(): any {
  const action: ActionTypes = {
    type: GET_POSTS_STARTED,
  };
  return (dispatch: DispatchType) => dispatch(action);
}

export function postsSuccess(data: Post[]): any {
  const action: ActionTypes = {
    type: GET_POSTS_SUCCESS,
    payload: data,
  };
  return middleware(action);
}

export function middleware(action: ActionTypes) {
  return (dispatch: DispatchType) => dispatch(action);
}
