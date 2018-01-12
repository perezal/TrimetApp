import React from "react";

export default class StopIDSearch extends React.Component {

  handleQueryChange(e) {
    this.props.onQueryChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.props.query);
  }

  render() {

    const {query} = this.props;

    return (
      <li className={"search-bar stopID-search"}>
        <form className="search-form" onSubmit={this.handleSubmit.bind(this)}>
          <input className="stopid-input" placeholder="Stop ID" value={query} onChange={this.handleQueryChange.bind(this)} />
          <button className="" id="get-arrivals" type="submit" onClick={this.handleSubmit.bind(this)}>
            Get Arrivals
          </button>
        </form>
      </li>
    )
  }
}
