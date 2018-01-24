import React from "react";

import { connect } from "react-redux";

import { fetchArrivals, fetchLines } from "../actions";

import Arrival from "./Arrivals/Arrival";
import StopTable from "./Stops/StopTable";
import LineMenu from "./Lines/LineMenu";

class Results extends React.Component {

  render() {

    const loadingAnimation = this.props.isFetching ? <div className="loading-animation"><div className="circle"></div><div className="circle1"></div></div> : null;

    const stopName = this.props.stopName ? <h2>Arrivals for {this.props.stopName}</h2> : "";
    const arrivalList = this.props.arrivals ? this.props.arrivals.map(arrival => <Arrival {...arrival} />) : "";

    const stopTable = this.props.stops[0] ? <StopTable stops={this.props.stops} onStopSelect={this.props.onStopSelect} /> : null;

    const lineMenu = this.props.lines[0] ? <LineMenu lines={this.props.lines} dirs={this.props.dirs} onLineSelect={this.props.onLineSelect} onStopSelect={this.props.onStopSelect} /> : null;

    return (
      <div className="results">
        <a href="https://github.com/perezal/TrimetApp" target="_blank" rel="noopener noreferrer" className="github-logo">
          <img src="/images/github.png" alt="github-logo" />
          <span>See me on Github!</span>
        </a>
        <h1>The Trimet App for Ninjas</h1>
        {loadingAnimation}
        {stopName}
        {arrivalList}
        {stopTable}
        {lineMenu}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const isFetching = state.stops.isFetching || state.lines.isFetching || state.arrivals.isFetching;
  return {
    stops: state.stops.stops,
    lines: state.lines.lines,
    isFetching: isFetching,
    dirs: state.dirs.dirs,
    stopID: state.stops.stopID,
    stopName: state.arrivals.stopName,
    arrivals: state.arrivals.arrivals,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStopSelect: (stopID) => dispatch(fetchArrivals(stopID)),
    onLineSelect: (line) => dispatch(fetchLines(line))
  }
}

const connectedResults = connect(mapStateToProps, mapDispatchToProps)(Results);

export default connectedResults;
