import React from "react";

export default class LocationSearch extends React.Component {

  render() {

    return (
      <li id="location-search" className="search-bar location-search search-hover">
        <button className="search-button" id="nearby-stops" type="button" onClick={this.props.onLocationSearch}>
          Nearby Stops
        </button>
      </li>
    )
  }


}
