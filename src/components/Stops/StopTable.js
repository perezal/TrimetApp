import React from "react";

import Stop from "./Stop";

export default class StopTable extends React.Component {

  render() {
    const stopsList = this.props.stops.map((stop, i) => {
      return <Stop key={i} {...stop} onStopSelect={this.props.onStopSelect} />;
    });

    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Stop Name</th>
            <th>Lines Serviced</th>
            <th>StopID</th>
          </tr>
        </thead>
        <tbody>
          {stopsList}
        </tbody>
      </table>
    );
  }
}
