import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//import { connect } from "react-redux";
//import * as actions from "../actions";

import Header from '../components/Header';
import MovieCreatePage from '../components/MovieCreatePage';
import MovieRatePage from '../components/MovieRatePage';
import MoviesDashboardPage from '../components/MoviesDashboardPage';

class App extends Component {
  render() {
    return <div className="container">
			<BrowserRouter>
				<div >
					<Header />
					<Route path="/" exact={true} component={MoviesDashboardPage} />
					<Route path="/create" component={MovieCreatePage} />
					<Route path="/rate" component={MovieRatePage} />
				</div>
			</BrowserRouter>
		</div>;
  }
}
export default App;
//export default connect(null, actions)(App);
