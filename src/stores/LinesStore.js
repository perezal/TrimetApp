import { EventEmitter } from "events";

import Dispatcher from "../Dispatcher";

class LinesStore extends EventEmitter {
  constructor() {
    super();
    this.lineData = {
      lines: []
    };
  }

  getLines() {
    return this.lineData;
  }

  clearLines() {
    this.lineData = {
      lines: []
    };

    this.emit("change");
  }

  receiveLines(result) {

    let rawLinesData = result.resultSet.route;

    if (!rawLinesData) {

      alert("Sorry, we could not find any Trimet lines.");
      return;
    }

    // non-relevant and incompatible lines
    const linesBlackList = [
      208, // Aerial Tram
      291, // Orange Night Bus
      98, // MAX Shuttle
      293, // Portland Streetcar Shuttle
      294, // CL Line Shuttle
      150, // MAX Transit Mall Shuttle
      103, // WES Shuttle
      13, // MAX Red Line Shuttle
      198, // Shuttle
    ];

    const linesData = rawLinesData
      .filter( (line) => !linesBlackList.includes(line.route) )
      .map((line) => ({
          name: line.desc,
          route: line.route,
        })
      );

    this.lineData = {
      lines: linesData
    };

    this.emit("change");

  }

  handleActions(action) {
    switch (action.type) {
      case "CLEAR_LINES": {
        this.clearLines();
        break;
      }
      case "RECEIVE_LINES": {
        this.receiveLines(action.data);
        break;
      }
      default:
        return true;
    }
  }
}

const linesStore = new LinesStore();
Dispatcher.register(linesStore.handleActions.bind(linesStore));

export default linesStore;
