const express = require("express");
const path = require("path");
const axios = require("axios");
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const db = require("./models");
const PORT = process.env.PORT || 3001;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const jwtMW = exjwt({
  secret: process.env.SECRET
});

// Database
mongoose.set("useCreateIndex", true);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/final_project",
  { useNewUrlParser: true },
  (err, db) => {
    if (err) {
      console.log("Failure to connect to database");
    } else {
      console.log("Connection to Database Successful");
    }
  }
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.post("/register", (req, res) => {
  db.User.create(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      if (error.code === 11000) {
        res.status(409).send(error);
      } else {
        res.status(500).send(error);
      }
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.User.find().then(dbUsers => {
    for (let user of dbUsers) {
      if (email.toLowerCase() === user.email && user.checkPassword(password)) {
        //If all credentials are correct do thiss
        let token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SECRET,
          { expiresIn: 129600 }
        ); // Sigining the token
        res.json({
          success: true,
          err: null,
          token
        });
        break;
      } else {
        res.status(401).json({
          success: false,
          token: null,
          err: "email or password is incorrect"
        });
      }
    }
  });
});

app.post("/location", (req, res) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        req.body.lat
      },${req.body.lng}&key=${process.env.GOOGLEAPIKEY}`
    )
    .then(response => {
      const data = response.data.results;
      let location = {
        latitude: req.body.lat,
        longitude: req.body.lng
      };
      if (data[1]) {
        for (let ac = 0; ac < data[0].address_components.length; ac++) {
          const component = data[0].address_components[ac];
          switch (component.types[0]) {
            case "locality":
              location.city = component.long_name;
              break;
            case "administrative_area_level_1":
              location.state = component.short_name;
              break;
            case "country":
              location.registered_country_iso_code = component.short_name;
              break;
          }
        }
      }
      res.status(200).json(location);
    })
    .catch(error => res.send(error));
});

// Send every other request to the React app
// Define any API routes before this runs

app.get("*", jwtMW, (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Error handling
app.use(function(error, req, res, next) {
  if (error.name === "UnauthorizedError") {
    res.status(401).send(error);
  } else {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
