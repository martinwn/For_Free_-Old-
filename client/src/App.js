import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import AuthService from "./components/AuthService";
import withAuth from "./components/WithAuth";
import AppBar from "./components/AppBar";
const Auth = new AuthService();

class App extends Component {
  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/login");
  };

  render() {
    console.log(this.props.user);
    return (
      <Router>
        <React.Fragment>
          <AppBar user={this.props.user} handleLogout={this.handleLogout} />
          <Route
            exact
            path="/"
            render={props => <HomePage {...props} user={this.props.user} />}
          />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/post" component={PostPage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default withAuth(App);
