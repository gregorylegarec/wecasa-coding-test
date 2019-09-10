import { formatPrice } from "./format";
describe("Format helpers", () => {
  describe("formatPrice", () => {
    it("should return formated price", () => {
      expect(formatPrice(1990)).toEqual("19,90 €");
    });

    it("should return padded decimals", () => {
      expect(formatPrice(500)).toEqual("5,00 €");
    });

    it("should use given format", () => {
      expect(formatPrice(2999, "$%i.%d")).toEqual("$29.99");
    });
  });
});
