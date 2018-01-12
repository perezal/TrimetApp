import React from "react";

export default class LineSearch extends React.Component {

  render(){

    return(
      <li className={"search-bar line-search search-hover"}>
        <button className="search-button" id="search-by-line" onClick={this.props.onLineSearch}>
          Search by Line
        </button>
      </li>
    )
  }
}
