import { AppState } from "./reducer";
import {
  Booking,
  PrestationCategory,
  Prestation,
  Universe
} from "../lib/wecasa/types";

// Booking
export const getBooking = (state: AppState): Booking => state.booking.data;
export const isSavingBooking = (state: AppState): boolean =>
  state.booking.saving;

// Haircut
export const getHaircutUniverse = (state: AppState): Universe =>
  state.haircut.universe;

export const isFetchingHaircutUniverse = (state: AppState): boolean =>
  state.haircut.fetching;

// Prestations
export const getPrestations = (state: AppState): Array<string> =>
  state.prestations;
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

/**
 * Returns the total price of prestations currently in slice prestations
 */
export const getPrestationsTotalPrice = (state: AppState): number => {
  // Let's compute prestation list from universe at every call. It's still
  // pretty cheap and keep us up to date with universe.
  const { categories } = state.haircut.universe;
  if (!categories.length) return 0;

  // Let's build a price index indexed by prestation reference
  const priceIndex = categories.reduce(
    (acc: any, category: PrestationCategory) => {
      for (var prestation of category.prestations) {
        acc[prestation.reference] = prestation.price;
      }
      return acc;
    },
    {}
  );

  const totalPrice = state.prestations.reduce(
    (acc: number, reference: string) => {
      return acc + priceIndex[reference];
    },
    0
  );

  return totalPrice;
};
