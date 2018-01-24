import React from "react";

export default class Stop extends React.Component {

  handleStopSelect() {
    this.props.onStopSelect(this.props.stopID);
  }

  render() {

    const routesList = this.props.routes ? this.props.routes.map((route, i) => {
      return <span key={i} className={"line-icon line" + route.route}>{route.route}</span>
    }) : null;

    const { name, stopID } = this.props;

    return (
      <tr onClick={ this.handleStopSelect.bind(this) }>
        <td>
          {name}
        </td>
        <td>
          {routesList}
        </td>
        <td>
          {stopID}
        </td>
      </tr>
    );
  }
}
