import { bookingReducer, updateBooking, resetBooking } from "./booking";

describe("Booking duck", () => {
  describe("reducer", () => {
    const state = {
      prestations: ["brushing"],
      appointment: "2018-10-12T14:30:00+02:00",
      address: "46 Rue René Clair, 75018 Paris"
    };

    it("should update booking", () => {
      const booking = {
        prestations: ["man_shampoo", "beard_shave"]
      };

      const expectedBooking = {
        prestations: ["man_shampoo", "beard_shave"],
        appointment: "2018-10-12T14:30:00+02:00",
        address: "46 Rue René Clair, 75018 Paris"
      };
      expect(bookingReducer(state, updateBooking(booking))).toEqual(
        expectedBooking
      );
    });

    it("should reset booking", () => {
      expect(bookingReducer(state, resetBooking())).toEqual({
        prestations: []
      });
    });
  });
});
