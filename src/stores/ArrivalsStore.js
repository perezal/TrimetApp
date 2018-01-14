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

    const arrivalData = rawArrivalData.map((arrival) => {

      return {
        key: arrival.scheduled,
        name: arrival.shortSign,
        arrivesIn: arrival.estimated ? this.formatEta(arrival.estimated) : this.formatScheduled(arrival.scheduled),
        estimated: (arrival.estimated !== undefined),
        routeColor: this.formatRouteColor(arrival.route)
      };
    });

    this.arrivalData = {
      stopID: rawResultSet.location[0].locid,
      stopName: rawResultSet.location[0].dir + " " + rawResultSet.location[0].desc,
      arrivals: arrivalData
    };

    this.emit("change");

  }

  formatTime(time) {
    // formats the Trimet time into a js Date object

    const month = parseInt(time.substr(5,2), 10) - 1;  //because js counts months from 0-11;

    const day = time.substr(8,2);
    const year = time.substr(0,4);
    const hour = time.substr(11,2);
    const minute = time.substr(14,2);
    const second = time.substr(17,2);
    const formatted_time = new Date(year,month,day,hour,minute,second);
    return formatted_time;
  }

  formatScheduled(scheduled) {
    const scheduledTime = this.formatTime(scheduled);
    return scheduledTime.toLocaleTimeString();
  }

  formatEta(estimated) {
    const trimetTime = this.formatTime(estimated).getTime(); //pulls arrival time in milliseconds

    const currentTime = Date.now(); //pulls current time in ms

    const totalMins = (trimetTime - currentTime) / 60000; //time in ms to min

    const days = parseInt(totalMins/1440, 10);
    const hours = parseInt((totalMins%1440)/60, 10);
    const mins = parseInt(totalMins%60, 10);
    let arrivalString = ((days) ? days + "d " : "") + ((hours) ? hours + "h " : "") + ((mins > 1) ? mins + " mins" : "") + ((mins === 1) ? mins + " min": "");
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
      case "CREATE_STUFF": {
        this.createStuff(action.number);
        break;
      }
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
