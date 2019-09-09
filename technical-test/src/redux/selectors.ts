import { AppState } from "./reducer";
import { Universe } from "../lib/wecasa/types";

export const getHaircutUniverse = (state: AppState): Universe =>
  state.haircut.universe;

export const isFetchingHaircutUniverse = (state: AppState): boolean =>
  state.haircut.fetching;
