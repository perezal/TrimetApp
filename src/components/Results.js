import React from "react";

import Arrival from "./StopIDSearch/Arrival";
import StopTable from "./LocationSearch/StopTable";
import LineMenu from "./LineSearch/LineMenu";

export default class Results extends React.Component {

  render() {

    let stopName, arrivalList, stopTable, lineMenu;

    // "mode" controls which results are displayed, ensuring only the most recently clicked search is shown

    const {mode} = this.props;

    if (mode === 1) { //location search

      stopTable = this.props.stops[0] ? <StopTable stops={this.props.stops} onStopSelect={this.props.onStopSelect} /> : null;

    } else if (mode === 2) { // stopID search

      stopName = this.props.stopName ? <h2>Arrivals for {this.props.stopName}</h2> : "";

      arrivalList = this.props.arrivals.map((arrival) => {
        return <Arrival key={1} {...arrival} />;
      });

    } else if (mode === 3) { // line search

      lineMenu = this.props.lines[0] ? <LineMenu lines={this.props.lines} dirs={this.props.dirs} onLineSelect={this.props.onLineSelect} onStopSelect={this.props.onStopSelect} /> : null;
    }

    return (
      <div id="results" className="results">
        {stopName}
        {arrivalList}
        {stopTable}
        {lineMenu}
      </div>
    )
  }
}
