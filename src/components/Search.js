import React from "react";

import StopIDSearch from "./StopIDSearch";
import LocationSearch from "./LocationSearch";
import LineSearch from "./LineSearch";

export default class Search extends React.Component {

  render() {

    return (
      <ul className="search">
        <LocationSearch onLocationSearch={this.props.onLocationSearch} />
        <StopIDSearch query={this.props.query} onQueryChange={this.props.onQueryChange} onSubmit={this.props.onSearchSubmit} />
        <LineSearch onLineSearch={this.props.onLineSearch} />
      </ul>
    );
  }

}
