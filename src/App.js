import React from "react";

import * as StopActions from "./actions/Actions";

import DirsStore from "./stores/DirsStore";
import LinesStore from "./stores/LinesStore";
import ArrivalsStore from "./stores/ArrivalsStore";
import StopsStore from "./stores/StopsStore";

import Search from "./components/Search";

import Results from "./components/Results";

import "./App.css";

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = Object.assign(
      ArrivalsStore.getArrivals(),
      StopsStore.getStops(),
      LinesStore.getLines(),
      DirsStore.getDirs(),
      {query: ""},
      {mode: 0}  // 0: base state, 1: location-search, 2: get-arrivals, 3: line-search
    );
    this.getData = this.getData.bind(this);
  }

  getData() {

    const stateData = Object.assign(ArrivalsStore.getArrivals(), StopsStore.getStops(), LinesStore.getLines(), DirsStore.getDirs() );

    this.setState(
      stateData
    );

  }

  componentWillMount() {

    this.getData(); //   Is this necessary???

    ArrivalsStore.on("change", this.getData);
    StopsStore.on("change", this.getData);
    LinesStore.on("change", this.getData);
    DirsStore.on("change", this.getData);
  }

  componentWillUnmount() {

    StopsStore.removeListener("change", this.getData);
    ArrivalsStore.removeListener("change", this.getData);
    LinesStore.removeListener("change", this.getData);
    DirsStore.removeListener("change", this.getData);
  }

  handleLocation() {
    StopActions.getNearbyStops(locationCallback);
    StopActions.clearLines();
    StopActions.clearArrivals();

    this.setState({
      mode: 1 // show location search results only
    })

    // loading text and removal callback

    let content = document.getElementById('nearby-stops').innerHTML;

    document.getElementById('nearby-stops').innerHTML = '...loading';

    function locationCallback() {
      document.getElementById('nearby-stops').innerHTML = content;
    }


        // let content = document.getElementById('nearby-stops').innerHTML;
        //
        // document.getElementById('nearby-stops').innerHTML = '<div class="loading-animation"><div class="circle"></div><div class="circle1"></div></div>';
        //
        // function locationCallback() {
        //   document.getElementById('nearby-stops').innerHTML = content;
        // }



  }

  handleQueryChange(query) {
    this.setState({
      query: query
    })
  }

  handleSearch(query) {

    query = parseInt(query, 10);

    if (isNaN(query)) {
      alert("Entry must contain only numbers.");

    } else {
      StopActions.getArrivals(query, arrivalsCallback);
      StopActions.clearStops();
      StopActions.clearLines();

      this.setState({
        query: query,
        mode: 2 // show arrivals results only
      });

      // loading text and removal callback

      let content = document.getElementById('get-arrivals').innerHTML;

      document.getElementById('get-arrivals').innerHTML = '...loading';

      function arrivalsCallback() {
        document.getElementById('get-arrivals').innerHTML = content;
      }
    }

  }

  showLines() {

    StopActions.clearArrivals();
    StopActions.clearStops();
    StopActions.getLines(linesCallback);

    this.setState({
      mode: 3 // show line search only
    })

    // loading text and removal callback

    let content = document.getElementById('search-by-line').innerHTML;

    document.getElementById('search-by-line').innerHTML = '...loading';

    function linesCallback() {
      document.getElementById('search-by-line').innerHTML = content;
    }

  }

  handleLineSelect(lineSelect) {
    StopActions.getLineDir(lineSelect);
  }

  render() {

    // const {stops, lines, dirs, arrivals, stopName, stopID} = this.state;

    // const resultsProps = {stops, lines, dirs, arrivals, stopName, stopID};

    return (
      <div className="home">
        <a href="https://github.com/perezal/TrimetApp" target="_blank" rel="noopener noreferrer" className="github-logo">
          <img src="/images/github.png" alt="github-logo" />
          <span>See me on Github!</span>
        </a>
        <h1>The Trimet App for Ninjas</h1>
        <p className="subtitle">and other assorted warriors of note</p>
        <blockquote>
          <p>A developed country is not a place where the poor have cars, it is where the rich ride public transportation.</p>
          <p><em>-Gustavo Petro, Mayor of Bogota</em></p>
        </blockquote>

        <Search query={this.state.query} onQueryChange={this.handleQueryChange.bind(this)} onSearchSubmit={this.handleSearch.bind(this)} onLocationSearch={this.handleLocation.bind(this)} onLineSearch={this.showLines.bind(this)} />
        <Results {...this.state} onStopSelect={this.handleSearch.bind(this)} onLineSearch={this.showLines.bind(this)} onLineSelect={this.handleLineSelect.bind(this)} />

      </div>
    );
  }
}
