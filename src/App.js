import React from "react";

import Search from "./components/Search";
import Results from "./components/Results";

import "./App.css";

class Home extends React.Component {

  render() {

    return (
      <div className="home">
        <Search />
        <Results />
      </div>
    );
  }
}

export default Home;