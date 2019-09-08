import { combineReducers } from "redux";

import { bookingReducer } from "./ducks/booking";
import { haircutReducer } from "./ducks/haircut";

export const rootReducer = combineReducers({
  booking: bookingReducer,
  haircut: haircutReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
