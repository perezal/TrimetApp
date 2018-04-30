import React from "react";

import Search from "./components/Search";
import Results from "./components/Results";

import { Provider } from "react-redux";
import store from "./store/index";

import "./App.css";

class Home extends React.Component {

  render() {

    return (
      <Provider store={store}>
        <div className="app">
          <Search />
          <Results />
        </div>
      </Provider>
    );
  }
}

export default Home;