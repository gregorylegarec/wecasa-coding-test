import { combineReducers } from "redux";

import { bookingReducer } from "./ducks/booking";
import { haircutReducer } from "./ducks/haircut";
import { prestationsReducer } from "./ducks/prestations";

export const rootReducer = combineReducers({
  booking: bookingReducer,
  haircut: haircutReducer,
  prestations: prestationsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
