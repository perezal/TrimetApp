import { EventEmitter } from "events";

import Dispatcher from "../Dispatcher";

class ArrivalsStore extends EventEmitter {
  constructor() {
    super();
    this.arrivalData = {
      stopID: 0,
      stopName: "",
      arrivals: [],
    };
  }

  getArrivals() {
    return this.arrivalData;
  }

  clearArrivals() {
    this.arrivalData = {
      stopID: 0,
      stopName: "",
      arrivals: [],
    };
  }

  receiveArrivals(result) {

    const rawResultSet = result.resultSet;
    const rawArrivalData = result.resultSet.arrival;

    if (!rawArrivalData) {

      alert("Sorry, your search did not return any results.");

      return;
    }

    const arrivalData = rawArrivalData.map((arrival) => ({
        key: arrival.scheduled,
        name: arrival.shortSign,
        arrivesIn: arrival.estimated ? this.formatEta(arrival.estimated) : this.formatScheduled(arrival.scheduled),
        estimated: (arrival.estimated !== undefined),
        routeColor: this.formatRouteColor(arrival.route)
      })
    );

    this.arrivalData = {
      stopID: rawResultSet.location[0].locid,
      stopName: rawResultSet.location[0].dir + " " + rawResultSet.location[0].desc,
      arrivals: arrivalData
    };

    this.emit("change");

  }

  formatScheduled(scheduled) {
    return new Date(scheduled).toLocaleTimeString();
  }

  formatEta(estimated) {

    const trimetTime = Date.parse(estimated); // estimated time in ms

    const currentTime = Date.now(); // current time in ms

    const totalMins = (trimetTime - currentTime) / 60000; // time in ms to min

    const days = parseInt(totalMins/1440, 10);
    const hours = parseInt((totalMins%1440)/60, 10);
    const mins = parseInt(totalMins%60, 10);
    let arrivalString = ((days) ? days + "d " : "") +
      ((hours) ? hours + "h " : "") +
      ((mins > 1) ? mins + " mins" : "") +
      ((mins === 1) ? mins + " min" : "");
    //e.g. "1d 12h 39 mins" or "2h 1 min" or "2h" or "Arriving Now"
    if (!arrivalString) {
        arrivalString = "Arriving Now";
    }
    return arrivalString;
  }

  formatRouteColor(route) {

    let routeColor;

    switch(route) {
      case 90: {
        routeColor = "redline";
        break;
      }
      case 100: {
        routeColor = "blueline";
        break;
      }
      case 190: {
        routeColor = "yellowline";
        break;
      }
      case 200: {
        routeColor = "greenline";
        break;
      }
      case 203: {
        routeColor = "wesline";
        break;
      }
      case 290: {
        routeColor = "orangeline";
        break;
      }
      default: {
        routeColor = "busline";
        break;
      }

    }
    return routeColor;
  }

  handleActions(action) {
    switch (action.type) {
      case "RECEIVE_ARRIVALS": {
        this.receiveArrivals(action.data);
        break;
      }
      case "CLEAR_ARRIVALS": {
        this.clearArrivals();
        break;
      }
      default:
        return true;
    }
  }
}

const arrivalsStore = new ArrivalsStore();
Dispatcher.register(arrivalsStore.handleActions.bind(arrivalsStore));

export default arrivalsStore;
