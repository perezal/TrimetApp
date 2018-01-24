import { combineReducers } from "redux";

import { arrivals } from "./arrivals.reducer";
import { dirs } from "./dirs.reducer";
import { lines } from "./lines.reducer";
import { stops } from "./stops.reducer";

const rootReducer = combineReducers({
  arrivals,
  dirs,
  lines,
  stops,
});

export default rootReducer;