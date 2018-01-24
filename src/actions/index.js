import { requests } from "../services";

export const clearAll = () => ({
  type: "CLEAR_ALL"
})

export const requestStops = () => ({
  type: "REQUEST_STOPS"
});

export const receiveStops = (data) => ({
  type: "RECEIVE_STOPS",
  payload: data
});

export const fetchStops = () => {
  return dispatch => {
    dispatch(clearAll());
    dispatch(requestStops());
    requests.getNearbyStops()
      .then(
        data => dispatch(receiveStops(data)),
        error => {
          dispatch(clearAll());
          alert(error);
        }
      );
  }
}

export const requestLines = () => ({
  type: "REQUEST_LINES"
});

export const receiveLines = (data) => ({
  type: "RECEIVE_LINES",
  payload: data
});

export const receiveDirs = (data) => ({
  type: "RECEIVE_DIRS",
  payload: data
});

export const fetchLines = (line = false) => {
  return dispatch => {
    if (line) {
      requests.getDirs(line)
        .then( data => dispatch(receiveDirs(data)));
    } else {
      dispatch(clearAll());
      dispatch(requestLines());
      requests.getLines()
        .then(
          data => dispatch(receiveLines(data)),
          error => {
            dispatch(clearAll());
            alert(error);
          }
        );
    }
  }
}

export const requestArrivals = () => ({
  type: "REQUEST_ARRIVALS"
});

export const receiveArrivals = (data) => ({
  type: "RECEIVE_ARRIVALS",
  payload: data
});

export const fetchArrivals = (stopID) => {
  return dispatch => {
    dispatch(clearAll());
    dispatch(requestArrivals());
    requests.getArrivals(stopID)
      .then(
        data => dispatch(receiveArrivals(data)),
        error => {
          dispatch(clearAll());
          alert(error);
        }
      );
  }
}