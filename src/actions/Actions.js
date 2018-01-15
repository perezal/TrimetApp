import Dispatcher from "../Dispatcher";

export function getArrivals(stopID, arrivalsCallback) {

  const source = "https://api.alexperez.ninja/trimet/arrivals/" + stopID;

  fetch(source)
    .then(function(response) {
      if (response.status !== 200) {
        console.log("Request error. Status code: " + response.status);
        return;
      }

      response.json().then(function(data) {
        Dispatcher.dispatch({type: "RECEIVE_ARRIVALS", data});
      });
      arrivalsCallback();
    })
    .catch(function(error) {
      alert("error: " + error);
    });
}

export function getLines(linesCallback) {

  const source = "https://api.alexperez.ninja/trimet/lines/";

  fetch(source)
    .then(function(response) {
      if (response.status !== 200) {
        console.log("Request error. Status code: " + response.status);
        return;
      }

      response.json().then(function(data) {
        Dispatcher.dispatch({type: "RECEIVE_LINES", data});
      });
      linesCallback();
    })
    .catch(function(error) {
      alert("error: " + error);
    });

}

export function getLineDir(lineSelect) {

  const source = "https://api.alexperez.ninja/trimet/lines/" + lineSelect;

  fetch(source)
    .then(function(response) {
      if (response.status !== 200) {
        console.log("Request error. Status code: " + response.status);
        return;
      }

      response.json().then(function(data) {
        Dispatcher.dispatch({type: "RECEIVE_DIRS", data});
      });
    })
    .catch(function(error) {
      alert("error: " + error);
    });
}

export function getNearbyStops(locationCallback) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, locationError);
    } else {
      alert("Geolocation is not enabled on your browser.");
    }

  function locationError() {
    alert("There was an error with your location. Please try again.");
    locationCallback(); // remove loading text
  }

  function showPosition(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;

    const source = "https://api.alexperez.ninja/trimet/stops/" + longitude + "/" + latitude;

    fetch(source)
      .then(function(response) {
        if (response.status !== 200) {
          console.log("Request error. Status code: " + response.status);
          return;
        }
        response.json().then(function(data) {
          if (data.resultSet.location) { // response contains location information
            Dispatcher.dispatch({type: "RECEIVE_STOPS", data});
          } else if (data.resultSet.querytime) { // response does not contain location, but has a timestamp
            alert("Sorry, we couldn't find any stops near you.");
          } else {
            alert("There was an error, please try again later.");
          }
        });
        locationCallback();
      })
      .catch(function(error) {
        alert("error: " + error);
      });

  }
}

export function clearStops() {

  Dispatcher.dispatch({type: "CLEAR_STOPS"});

}

export function clearArrivals() {

  Dispatcher.dispatch({type: "CLEAR_ARRIVALS"});

}

export function clearLines() {

  Dispatcher.dispatch({type: "CLEAR_LINES"});

}
