import { AppState } from "./reducer";
import { Prestation, Universe } from "../lib/wecasa/types";

// Haircut
export const getHaircutUniverse = (state: AppState): Universe =>
  state.haircut.universe;

export const isFetchingHaircutUniverse = (state: AppState): boolean =>
  state.haircut.fetching;

// Prestations

/**
 * Return the number of prestation of given reference already picked up.
 */
export const getNumPrestations = (
  state: AppState,
  reference: Prestation["reference"]
): number => {
  if (reference) {
    return state.prestations.filter((ref: string) => ref === reference).length;
  }
  return 0;
};
