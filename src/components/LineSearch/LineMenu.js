import React from "react";

import Line from "./Line";

export default class LineMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      dir: 0
    }
  }

  componentDidMount() {
    this.handleLineSelect();
  }

  handleLineSelect() {
    const lineSelect = this.lineSelect.value;
    this.props.onLineSelect(lineSelect);
    this.setState({
      dir: 0
    });
  }

  handleDirSelect() {
    const dirSelect = this.dirSelect.value;
    this.setState({
      dir: dirSelect
    });
  }

  handleSubmit() {
    const stopID = this.stopSelect.value;
    this.props.onStopSelect(stopID);
  }

  render() {

    const linesList = this.props.lines.map((line, i) => {

      return <Line key={i} value={line.route} {...line} />;

    });

    const dirsList = this.props.dirs.map((dir, i) => {

      return <Line key={i} name={dir.desc} value={dir.dir} />

    });

    // takes the current selected direction, either 0 or 1
    // i.e., northbound/southbound, eastbound/westbound
    // and finds the stops associated with that direction
    const stops = this.props.dirs[this.state.dir] ? this.props.dirs[this.state.dir].stop : [];

    const stopsList = stops.map((stop, i) => {

      return <Line key={i} name={stop.desc} value={stop.locid} />
    });

    return (
      <div className="line-menu">
        <br />
        <select ref={(selection) => this.lineSelect = selection} onChange={this.handleLineSelect.bind(this)}>
          {linesList}
        </select>
        <br />
        <select ref={(selection) => this.dirSelect = selection} onChange={this.handleDirSelect.bind(this)}>
          {dirsList}
        </select>
        <br />
        <select ref={(selection) => this.stopSelect = selection}>
          {stopsList}
        </select>
        <br />
        <div className="search-hover">
          <button className="search-button line-submit" onClick={this.handleSubmit.bind(this)}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
