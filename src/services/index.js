export const requests = {
  getArrivals,
  getNearbyStops,
  getLines,
  getDirs,
};

function getArrivals(stopID) {
  const source = "https://api.alexperez.ninja/trimet/arrivals/" + stopID;

  return fetch(source)
    .then(function(response) {
      if (!response.ok) {
        console.log("Request error. Status code: " + response.status);
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (data.resultSet.arrival) {
        return data.resultSet;
      } else if (data.resultSet.location) { // No arrival data, but location found
        return Promise.reject("No arrivals for stop " + data.resultSet.location[0].desc + " found.");
      } else {
        return Promise.reject("No stop found for that stop ID.");
      }
    });
}

function getLines() {
  const source = "https://api.alexperez.ninja/trimet/lines/";

  return fetch(source)
    .then(function(response) {
      if (!response.ok) {
        console.log("Request error. Status code: " + response.status);
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (data.resultSet.route) {
        return data.resultSet;
      } else {
        return Promise.reject("Sorry, we couldn't find the Trimet lines. Please try again.");
      }
    });
}

function getNearbyStops() {

  const geolocationPromise = new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, (err) => reject(err.message));
    } else {
      reject("Geolocation is not enabled on your browser");
    }
  });

  return geolocationPromise
    .then(function(position) {
      const { longitude, latitude } = position.coords;
      const source = "https://api.alexperez.ninja/trimet/stops/" +
                      longitude + "/" + latitude;

      return fetch(source)
        .then(function(response) {
          if (!response.ok) {
            console.log("Request error. Status: " + response.status + " " + response.statusText);
            return Promise.reject(response.statusText);
          }
          return response.json();
        })
        .then(function(data) {
          if (data.resultSet.location) { // response contains location information
            return data.resultSet;
          } else if (data.resultSet.queryTime) { // response does not contain location, but has a timestamp
            return Promise.reject("Sorry, we couldn't find any stops near you.");
          } else {
            return Promise.reject("There was an error, please try again later.");
          }
        })
    });
}

function getDirs(lineSelect) {

  const source = "https://api.alexperez.ninja/trimet/lines/" + lineSelect;

  return fetch(source)
    .then(function(response) {
      if (!response.ok) {
        console.log("Request error. Status code: " + response.status);
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (data.resultSet.route[0].dir) {
        return data.resultSet;
      } else {
        return Promise.reject("Sorry, no data was found for that line.");
      }
    });
}