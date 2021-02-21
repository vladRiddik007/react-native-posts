import { combineReducers } from "redux";
import { postsReducer } from "./Posts/reducer";

const rootReducer = combineReducers({
  postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };
