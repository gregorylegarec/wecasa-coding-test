/**
 * This duck fetches haircut from wecasa
 */
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppState } from "../reducer";
import { WecasaClient } from "../../lib/wecasa/client";
import { Universe } from "../../lib/wecasa/types";

export interface HaircutState {
  universe: Universe;
  fetching: boolean;
}

// Action types
export const START_FETCHING_HAIRCUT_UNIVERSE =
  "START_FETCHING_HAIRCUT_UNIVERSE";
export const RECEIVE_HAIRCUT_UNIVERSE = "RECEIVE_HAIRCUT_UNIVERSE";

export interface StartFetchinghHaircutUniverseAction {
  type: typeof START_FETCHING_HAIRCUT_UNIVERSE;
}

export interface ReceiveHaircutUniverseAction {
  type: typeof RECEIVE_HAIRCUT_UNIVERSE;
  payload: Universe;
}

export type HaircutActionTypes =
  | StartFetchinghHaircutUniverseAction
  | ReceiveHaircutUniverseAction;

// Action
export const startFetchinghHaircutUniverse = (): StartFetchinghHaircutUniverseAction => ({
  type: START_FETCHING_HAIRCUT_UNIVERSE
});

export const receiveHaircutUniverse = (
  universe: Universe
): ReceiveHaircutUniverseAction => ({
  type: RECEIVE_HAIRCUT_UNIVERSE,
  payload: universe
});

// Thunks
export const fetchHaircutUniverse = (
  client: WecasaClient
): ThunkAction<Promise<void>, AppState, null, AnyAction> => async dispatch => {
  dispatch(startFetchinghHaircutUniverse());
  const universe = await client.fetchHaircutUniverse();
  dispatch(receiveHaircutUniverse(universe));
};

// Reducer
const initialState = {
  fetching: false,
  universe: {
    categories: []
  }
};

export const haircutReducer = (
  state: HaircutState = initialState,
  action: HaircutActionTypes
): HaircutState => {
  switch (action.type) {
    case START_FETCHING_HAIRCUT_UNIVERSE:
      return { ...state, fetching: true };
    case RECEIVE_HAIRCUT_UNIVERSE:
      return { ...state, fetching: false, universe: action.payload };
    default:
      return state;
  }
};

export default haircutReducer;
