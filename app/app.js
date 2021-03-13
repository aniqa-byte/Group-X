"use strict";

// The application layer to use user and item classes
const library = require("../library.js");

// The application layer to access the data layer
const data = require("../data/data.js");

// Import express library
const express = require("express");

// Value express application
var app = express();

// Add static files location
app.use(express.static("static"));

// Add /user endpoint
app.get("/user/:email", function(req, res) {
    // Return user detail
    res.send("User email: " + req.params.email);
});

// Add /users endpoint
app.get("/users", function(req, res) {
    // Call getUsers from data
    data.getUsers(function(user_collection) {
        res.json(user_collection);
    });
});

// Add /book endpoint
app.get("/book/:title", function(req, res) {
    // Return book detail
    res.send("Book title: " + req.params.title);
});

// Add /books endpoint
app.get("/books", function(req, res) {
    // Return all info links
    res.send("All books");
});

// Add /category endpoint
app.get("/category/:category", function(req, res) {
    // Return categroup group option
    res.send("Category: " + req.params.category);
});

// Add /categories endpoint
app.get("/categories", function(req, res) {
    // Return all category options
    res.send("All categories");
});

// Initiate listen on port 3000
app.listen(3000, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log("Server started.");
});