const initialState = {
  isFetching: false,
  stops: []
};

const format_stops = data => {
  const rawStopsData = data.location;

  rawStopsData.splice(10); // Show only the closest 10 stops

  const stopsData = rawStopsData.map((stop) => {
    return {
      name: stop.desc + " " + stop.dir,
      stopID: stop.locid,
      routes: stop.route,
    };
  });

  return stopsData;
}

const stops = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_STOPS":
      return {
        ...state,
        isFetching: true,
      };
    case "RECEIVE_STOPS":
      return {
        ...state,
        stops: format_stops(action.payload),
        isFetching: false,
      };
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

export { stops };