/**
 * This duck provides actions and reducers to manage state of current booking.
 */
import { Booking } from "../../lib/wecasa/types";

// State type
// No enum for now, should be a nice improvement

export type BookingState = Booking;

// Action types
export const UPDATE_BOOKING = "AUPDATE_BOOKING";
export const RESET_BOOKING = "RESET_BOOKING";

interface UpdateBookingAction {
  type: typeof UPDATE_BOOKING;
  payload: Object;
}

interface ResetBookingAction {
  type: typeof RESET_BOOKING;
}

type BookingActionTypes = UpdateBookingAction | ResetBookingAction;

// Actions
export const updateBooking = (attributes: Object): UpdateBookingAction => ({
  type: UPDATE_BOOKING,
  payload: attributes
});

export const resetBooking = (): ResetBookingAction => ({
  type: RESET_BOOKING
});

// Reducer
const initialState = {
  prestations: []
};

export const bookingReducer = (
  state: BookingState = initialState,
  action: BookingActionTypes
): BookingState => {
  switch (action.type) {
    case UPDATE_BOOKING:
      return { ...state, ...action.payload };
    case RESET_BOOKING:
      return { ...initialState };
    default:
      return state;
  }
};

export default bookingReducer;
