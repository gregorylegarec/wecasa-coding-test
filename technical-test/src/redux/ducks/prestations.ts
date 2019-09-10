/**
 * This duck provides actions and reducers to manage current prestation list,
 * in app's first step.
 */
import { removeFirstValue } from "../../helpers/array";
import { Prestation } from "../../lib/wecasa/types";

// State type
export type PrestationsState = Array<string>;

// Action types
export const ADD_PRESTATION = "ADD_PRESTATION";
export const REMOVE_PRESTATION = "REMOVE_PRESTATION";
export const RESET_PRESTATIONS = "RESET_PRESTATIONS";

interface AddPrestationAction {
  type: typeof ADD_PRESTATION;
  payload: string;
}

interface RemovePrestationAction {
  type: typeof REMOVE_PRESTATION;
  payload: string;
}

interface ResetPrestationsAction {
  type: typeof RESET_PRESTATIONS;
}

type PrestationsActionTypes =
  | AddPrestationAction
  | RemovePrestationAction
  | ResetPrestationsAction;

// Actions
export const addPrestation = (
  reference: Prestation["reference"]
): AddPrestationAction => ({
  type: ADD_PRESTATION,
  payload: reference
});

export const removePrestation = (
  reference: Prestation["reference"]
): RemovePrestationAction => ({
  type: REMOVE_PRESTATION,
  payload: reference
});

export const resetPrestations = (): ResetPrestationsAction => ({
  type: RESET_PRESTATIONS
});

// Reducer
export const prestationsReducer = (
  state: PrestationsState = [],
  action: PrestationsActionTypes
): PrestationsState => {
  switch (action.type) {
    case ADD_PRESTATION:
      return [...state, action.payload];
    case REMOVE_PRESTATION:
      return removeFirstValue(state, action.payload);
    case RESET_PRESTATIONS:
      return [];
    default:
      return state;
  }
};

export default prestationsReducer;
