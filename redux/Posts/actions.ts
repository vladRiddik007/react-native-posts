import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import {
  GET_POSTS_ERROR,
  GET_POSTS_STARTED,
  GET_POSTS_SUCCESS,
  DispatchType,
  ActionTypes,
  Post,
} from "./types";

const headers = { "Content-Type": "application/json" };

export const postsGet = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(postsStarted());
  return await fetch(
    "http://my-json-server.typicode.com/orlovskyalex/jellyfish-fake-rest-server/posts",
    { headers }
  )
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
