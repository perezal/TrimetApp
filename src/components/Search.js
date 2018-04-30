import React from "react";

import { connect } from "react-redux";
import { fetchStops, fetchLines, fetchArrivals } from "../actions";

class Search extends React.Component {

  state = {
    stopID: ''
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleArrivalsSearch(e) {
    e.preventDefault();
    const { stopID } = this.state;
    if (!stopID || isNaN(stopID)) {
      alert("Entry must only consist of numbers and not be blank");
      this.setState({stopID: ''});
    } else {
      this.props.onArrivalsSearch(this.state.stopID);
    }
  }

  render() {

    return (
      <nav className="search">
        <ul className="search-menu">
          <li id="nearby-stops" className="search-button">
            <button onClick={this.props.onLocationSearch}>Nearby Stops</button>
          </li>
          <li id="get-arrivals" className="search-button">
            <form action="/" onSubmit={ this.handleArrivalsSearch.bind(this) }>
              <button>Search by Stop ID</button>
              <input type="text" name="stopID" onChange={this.handleChange.bind(this)} value={this.state.stopID} />
            </form>
          </li>
          <li id="search-by-line" className="search-button">
            <button onClick={this.props.onLineSearch}>Search By Line</button>
          </li>
        </ul>
      </nav>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onLocationSearch: () => dispatch(fetchStops()),
    onArrivalsSearch: (stopID) => dispatch(fetchArrivals(stopID)),
    onLineSearch: () => dispatch(fetchLines())
  }
};

const connectedSearch = connect(null, mapDispatchToProps)(Search);

export default connectedSearch;
