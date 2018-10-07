import React, { Component } from "react";
import AuthService from "./AuthService";
import API from "../utils/API";
const geolocation = require("geolocation");

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          const profile = Auth.getProfile();

          geolocation.getCurrentPosition((error, position) => {
            if (error) throw error;
            const query = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            API.getLocation(query)
              .then(response => {
                profile.location = response.data;
                this.setState({
                  user: profile
                });
              })
              .catch(error => console.log(error));
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}
