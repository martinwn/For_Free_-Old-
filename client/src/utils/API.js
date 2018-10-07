const axios = require("axios");

export default {
  registerUser: function(query) {
    return axios.post("/register", query);
  },

  getLocation: function(query) {
    return axios.post("/location", query);
  }
};
