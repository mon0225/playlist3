const express = require("express");
const passport = require('passport');
const apiRoutes = express.Router();
const User = require("../models/User");
const fetch = require("node-fetch");
const SpotifyWebApi = require('spotify-web-api-node');

var varClientId = process.env.clientID;
var varClientSecret = process.env.clientSecret;

var spotifyApi = new SpotifyWebApi({
  clientId : varClientId,
  clientSecret : varClientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('Autenticando...');
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Autenticando OK');
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

apiRoutes.get("/playlist/:busqueda", (req, res, next) => {
  const busqueda = req.params.busqueda;
  console.log(busqueda);
  res.status(200);
  // fetch("https://jsonplaceholder.typicode.com/albums")
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       res.status(200);
  //       res.json(result);
  //     },
  //     (error) => {
  //       console.log("Error al consultar la API");
  //     }
  //   )
  spotifyApi.searchArtists(busqueda)
    .then(data => {
         res.status(200);
         console.log(data.body.artists.items);
         res.json(data.body.artists.items);
    })
    .catch(err => {
      res.render('error');
    });
});

// apiRoutes.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/api/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));
//
// apiRoutes.get("/signup", (req, res, next) => {
//   res.render("api/signup");
// });
//
// apiRoutes.post("/signup", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const rol = req.body.role;
//   if (username === "" || password === "") {
//     res.render("api/signup", { message: "Indicate username and password" });
//     return;
//   }
//
//   User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("api/signup", { message: "The username already exists" });
//       return;
//     }
//
//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);
//
//     const newUser = new User({
//       username,
//       password: hashPass
//     });
//
//     newUser.save((err) => {
//       if (err) {
//         res.render("api/signup", { message: "Something went wrong" });
//       } else {
//         res.redirect("/");
//       }
//     });
//   });
// });
//
// apiRoutes.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

module.exports = apiRoutes;
