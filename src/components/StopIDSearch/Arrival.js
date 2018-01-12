import React from "react";

export default class Arrival extends React.Component {

  render() {
    const {name} = this.props;
    const {routeColor} = this.props;
    const {estimated} = this.props;
    let arrivesIn;
    if (estimated) {
      arrivesIn = this.props.arrivesIn;
    } else {
      arrivesIn = "Arrives at " + this.props.arrivesIn + " (scheduled)";
    }


    return (
      <div className={"arrival " + routeColor}>
        <h2>{name}</h2>
        <h2>{arrivesIn}</h2>
      </div>
    );
  }
}
