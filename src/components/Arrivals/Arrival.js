import React from "react";

export default class Arrival extends React.Component {

  render() {
    const { name, routeColor, arrivesIn } = this.props;

    return (
      <div className={"arrival " + routeColor}>
        <h2>{name}</h2>
        <h2>{arrivesIn}</h2>
      </div>
    );
  }
}
