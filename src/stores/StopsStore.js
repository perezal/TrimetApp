import { EventEmitter } from "events";

import Dispatcher from "../Dispatcher";

class StopsStore extends EventEmitter {
  constructor() {
    super();
    this.stopData = {
      stops: []
    };
  }

  getStops() {
    return this.stopData;
  }

  clearStops() {
    this.stopData = {
      stops: []
    };

    this.emit("change");
  }

  receiveStops(result) {

    const rawStopsData = result.resultSet.location;

    if (!rawStopsData) {

      alert("No relevant stops found.");

      return;
    }

    rawStopsData.splice(10);

    const stopsData = rawStopsData.map((stop) => {

      return {
        name: stop.desc + " " + stop.dir,
        stopID: stop.locid,
        routes: stop.route,
      };
    });

    this.stopData = {
      stops: stopsData
    };

    this.emit("change");

  }

  handleActions(action) {
    switch (action.type) {
      case "CLEAR_STOPS": {
        this.clearStops();
        break;
      }
      case "RECEIVE_STOPS": {
        this.receiveStops(action.data);
        break;
      }
      default:
        return true;
    }
  }
}

const stopsStore = new StopsStore();
Dispatcher.register(stopsStore.handleActions.bind(stopsStore));

export default stopsStore;
