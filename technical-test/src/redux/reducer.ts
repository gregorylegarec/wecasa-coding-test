import { combineReducers } from "redux";

import { haircutReducer } from "./ducks/haircut";

export const rootReducer = combineReducers({
  haircut: haircutReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
