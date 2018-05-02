import moment from 'moment';
import { requests } from '../services';
import { actionTypes } from '../constants/actions';

const clearAll = () => ({
  type: actionTypes.CLEAR_ALL
})

const requestStops = () => ({
  type: actionTypes.REQUEST_STOPS
});

const receiveStops = (data) => ({
  type: actionTypes.RECEIVE_STOPS,
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

const requestLines = () => ({
  type: actionTypes.REQUEST_LINES
});

const receiveLines = (data) => ({
  type: actionTypes.RECEIVE_LINES,
  payload: data
});

const receiveDirs = (data) => ({
  type: actionTypes.RECEIVE_DIRS,
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

const requestArrivals = () => ({
  type: actionTypes.REQUEST_ARRIVALS
});

const receiveArrivals = (data) => ({
  type: actionTypes.RECEIVE_ARRIVALS,
  payload: data,
  currentTime: moment()
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