import { EventEmitter } from "events";

import Dispatcher from "../Dispatcher";

class DirsStore extends EventEmitter {
  constructor() {
    super();
    this.dirData = {
      dirs: []
    }
  }

  getDirs() {
    return this.dirData;
  }

  receiveDirs(result) {
    const rawDirData = result.resultSet.route[0].dir;

    if (!rawDirData) {

      alert("Unable to find information regarding this line.");

      return;
    }

    this.dirData = {
      dirs: rawDirData
    }

    this.emit("change");

  }

  handleActions(action) {
    switch (action.type) {
      case "RECEIVE_DIRS": {
        this.receiveDirs(action.response);
        break;
      }
      default:
        return true;
    }
  }
}

const dirsStore = new DirsStore();
Dispatcher.register(dirsStore.handleActions.bind(dirsStore));

export default dirsStore;
