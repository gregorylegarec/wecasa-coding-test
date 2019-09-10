/**
 * This duck provides actions and reducers to manage state of current booking.
 */
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppState } from "../reducer";
import { Booking } from "../../lib/wecasa/types";
import WecasaClient from "../../lib/wecasa/client";

// State type
// No enum for now, should be a nice improvement

export type BookingState = {
  saving: boolean;
  data: Booking;
};

// Action types
export const UPDATE_BOOKING = "AUPDATE_BOOKING";
export const RESET_BOOKING = "RESET_BOOKING";
export const START_SAVING = "START_SAVING";
export const END_SAVING = "END_SAVING";

interface UpdateBookingAction {
  type: typeof UPDATE_BOOKING;
  payload: Object;
}

interface ResetBookingAction {
  type: typeof RESET_BOOKING;
}

interface StartSavingAction {
  type: typeof START_SAVING;
}

interface EndSavingAction {
  type: typeof END_SAVING;
}

type BookingActionTypes =
  | UpdateBookingAction
  | ResetBookingAction
  | StartSavingAction
  | EndSavingAction;

// Actions
export const updateBooking = (attributes: Object): UpdateBookingAction => ({
  type: UPDATE_BOOKING,
  payload: attributes
});

export const resetBooking = (): ResetBookingAction => ({
  type: RESET_BOOKING
});

export const startSavingBooking = (): StartSavingAction => ({
  type: START_SAVING
});

export const endSavingBooking = (): EndSavingAction => ({
  type: END_SAVING
});

// Thunks
export const saveBooking = (
  client: WecasaClient
): ThunkAction<Promise<void>, AppState, null, AnyAction> => async (
  dispatch,
  getState: () => AppState
) => {
  console.debug("saveBooking", { booking: getState().booking.data });
  dispatch(startSavingBooking());
  await client.saveBooking(getState().booking.data);
  dispatch(endSavingBooking());
};

// Reducer
const initialState = {
  saving: false,
  data: { prestations: [] }
};

export const bookingReducer = (
  state: BookingState = initialState,
  action: BookingActionTypes
): BookingState => {
  switch (action.type) {
    case UPDATE_BOOKING:
      return { ...state, data: { ...state.data, ...action.payload } };
    case RESET_BOOKING:
      return { ...initialState };
    case START_SAVING:
      return { ...state, saving: true };
    case END_SAVING:
      return { ...state, saving: false };
    default:
      return state;
  }
};

export default bookingReducer;
