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

    var rawLinesData = result.resultSet.route;

    if (!rawLinesData) {

      alert("Sorry, we could not find any Trimet lines.");
      return;
    }

    // remove specific non-relevant or incompatible lines
    const removeLinesList = [208, // Aerial Tram
                              291,
                              98,
                              293,
                              150,
                              103,
                              13,
                              198]

    for (var x = rawLinesData.length - 1; x >= 0; x--) {
      for (var line in removeLinesList) {
        if (rawLinesData[x].route === removeLinesList[line]) {
          rawLinesData.splice(x, 1);
          removeLinesList.splice(line, 1);
          break;
        }
      }

    }

    console.log(rawLinesData);

    const linesData = rawLinesData.map((line) => {

      return {
        name: line.desc,
        route: line.route,
      };
    });

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
