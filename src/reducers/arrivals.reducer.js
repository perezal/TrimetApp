const initialState = {
  isFetching: false,
  stopID: 0,
  stopName: "",
  arrivals: []
};

const format_arrivals = data => {
  const rawArrivalData = data.arrival;

  // can this be moved to CSS?
  const routeColors = {
    90: "redline",
    100: "blueline",
    190: "yellowline",
    200: "greenline",
    203: "wesline",
    290: "orangeline",
  }

  const arrivalData = rawArrivalData.map((arrival) => ({
      key: arrival.scheduled,
      name: arrival.shortSign,
      arrivesIn: arrival.estimated ? formatEstimatedTime(arrival.estimated) : formatScheduledTime(arrival.scheduled),
      routeColor: routeColors[arrival.route] ? routeColors[arrival.route] : "busline"
    })
  );

  return {
    stopID: data.location[0].locid,
    stopName: data.location[0].dir + " " + data.location[0].desc,
    arrivals: arrivalData
  };
}

const formatScheduledTime = scheduledTime => {
  const arrivalTime = new Date(scheduledTime).toLocaleTimeString();
  return "Arrives at " + arrivalTime + " (scheduled)";
}

const formatEstimatedTime = estimatedTime => {

  const minsToArrival = (Date.parse(estimatedTime) - Date.now()) / 60000; // time in ms to min

  const days = parseInt( minsToArrival / 1440, 10 );
  const hours = parseInt(( minsToArrival % 1440 ) / 60, 10 );
  const mins = parseInt( minsToArrival % 60, 10 );

  const arrivalString =
    ((days) ? days + "d " : "") +
    ((hours) ? hours + "h " : "") +
    ((mins > 1) ? mins + " mins" : "") +
    ((mins === 1) ? mins + " min" : "");

  //e.g. "1d 12h 39 mins" or "2h 1 min" or "2h" or "Arriving Now"
  return arrivalString || "Arriving Now";
}

const arrivals = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_ARRIVALS":
      return {
        ...state,
        isFetching: true,
      };
    case "RECEIVE_ARRIVALS":
      return Object.assign(...state,
        format_arrivals(action.payload),
        { isFetching: false },
      );
    case "CLEAR_ALL":
      return initialState;
    default:
      return state;
  }
};

export { arrivals };