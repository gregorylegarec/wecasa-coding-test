import {
  haircutReducer,
  startFetchinghHaircutUniverse,
  receiveHaircutUniverse
} from "./haircut";

const fixtures = {
  universe: {
    reference: "haircut",
    title: "Coiffure",
    categories: [
      {
        reference: "man",
        title: "Homme",
        prestations: [
          {
            reference: "man_shampoo",
            title: "Shampoing",
            duration: 10,
            price: 500
          },
          {
            reference: "man_haircut",
            title: "Coupe",
            duration: 30,
            price: 2690
          }
        ]
      }
    ]
  }
};

describe("Haircut duck", () => {
  describe("reducer", () => {
    it("should start fetching", () => {
      const state = {};
      const nextState = haircutReducer(state, startFetchinghHaircutUniverse());
      expect(nextState.fetching).toBe(true);
    });

    it("should receive universe", () => {
      const state = {};
      const nextState = haircutReducer(
        state,
        receiveHaircutUniverse(fixtures.universe)
      );
      expect(nextState.fetching).toBe(false);
      expect(nextState.universe).toEqual(fixtures.universe);
    });
  });
});
