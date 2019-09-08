import {
  prestationsReducer,
  addPrestation,
  removePrestation
} from "./prestations";

describe("Prestations duck", () => {
  describe("reducer", () => {
    it("should add a prestation", () => {
      const state = ["brushing"];
      expect(prestationsReducer(state, addPrestation("man_shampoo"))).toEqual([
        "brushing",
        "man_shampoo"
      ]);
    });

    it("should remove prestation", () => {
      const state = ["brushing", "man_shampoo"];
      expect(prestationsReducer(state, removePrestation("brushing"))).toEqual([
        "man_shampoo"
      ]);
    });
  });
});
