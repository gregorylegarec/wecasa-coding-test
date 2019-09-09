import { Booking } from "./types";

const url = "https://www.wecasa.fr/api/techtest";

export class WecasaClient {
  async fetchHaircutUniverse() {
    const response = await fetch(`${url}/universe`, {
      headers: new Headers({ Accept: "application/json" })
    });
    return response.json();
  }

  async saveBooking(booking: Booking) {
    return fetch(`${url}/booking`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(booking)
    });
  }
}

export default WecasaClient;
