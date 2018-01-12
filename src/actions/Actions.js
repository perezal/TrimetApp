import Dispatcher from "../Dispatcher";

export function getArrivals(stopID, arrivalsCallback) {

  const source = "https://trimetapp.alexperez.ninja/api/arrivals/" + stopID;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200 && xmlhttp.statusText === 'OK') {
        const response = JSON.parse(xmlhttp.response);
        Dispatcher.dispatch({type: "RECEIVE_ARRIVALS", response});
      }
      else {
        alert("There was an error, please try again later.");
      }
      arrivalsCallback(); // remove loading text
    }
  };

  xmlhttp.open('GET', source, true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.send();
}

export function getLines(linesCallback) {

  const source = "https://trimetapp.alexperez.ninja/api/lines/";

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200 && xmlhttp.statusText === 'OK' && xmlhttp.response) {
        const response = JSON.parse(xmlhttp.response);
        Dispatcher.dispatch({type: "RECEIVE_LINES", response});
      }
      else {
        alert("There was an error, please try again later.");
      }
      linesCallback(); // remove loading text
    }
  };

  xmlhttp.open('GET', source, true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.send();

}

export function getLineDir(lineSelect) {

  const source = "https://trimetapp.alexperez.ninja/api/lines/" + lineSelect;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200 && xmlhttp.statusText === 'OK') {
        const response = JSON.parse(xmlhttp.response);
        Dispatcher.dispatch({type: "RECEIVE_DIRS", response});
      }
      else {
        alert("There was an error, please try again later.");
      }
    }
  };

  xmlhttp.open('GET', source, true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.send();
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

    const source = "https://trimetapp.alexperez.ninja/api/stops/" + longitude + "/" + latitude;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {

        if (xmlhttp.status === 200 && xmlhttp.statusText === 'OK' && xmlhttp.response) {

          const response = JSON.parse(xmlhttp.response);

          if (response.resultSet.location) { // response contains more than timestamp

            Dispatcher.dispatch({type: "RECEIVE_STOPS", response});

          } else if (response.resultSet.queryTime) { // response contains timestamp, but no location information
            alert("Sorry, we couldn't find any stops near you.");
          }
        } else {
          alert("There was an error, please try again later.");
        }
        locationCallback(); // remove loading text
      }
    };

    xmlhttp.open('GET', source, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
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
