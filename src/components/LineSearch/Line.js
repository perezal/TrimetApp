import React from "react";

export default class Line extends React.Component {

  render() {
    const {name} = this.props;
    const {value} = this.props;

    return (
      <option value={value}>{name}</option>
    );
  }
}
