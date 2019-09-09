/**
 * This duck fetches haircut from wecasa
 */
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppState } from "../reducer";
import { WecasaClient } from "../../lib/client";

export interface HaircutState {
  universe: Object;
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
  payload: Object;
}

export type HaircutActionTypes =
  | StartFetchinghHaircutUniverseAction
  | ReceiveHaircutUniverseAction;

// Action
export const startFetchinghHaircutUniverse = (): StartFetchinghHaircutUniverseAction => ({
  type: START_FETCHING_HAIRCUT_UNIVERSE
});

export const receiveHaircutUniverse = (
  universe: Object
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
export const haircutReducer = (
  state: HaircutState = { fetching: false, universe: {} },
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
