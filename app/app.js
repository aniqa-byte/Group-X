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
    // Call getUserProfile from data
    data.getUserProfile(req.params.email, function(user_profile) {
        res.json(user_profile);
    });
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
    // Call getBook from data
    data.getBook(req.params.title, function(book_item) {
        res.json(book_item);
    });
});

// Add /books endpoint
app.get("/books", function(req, res) {
    // Call getBookItems from data
    data.getBookItems(function(book_collection) {
        res.json(book_collection);
    });
});

// Add /category endpoint
app.get("/category/:category", function(req, res) {
    // Call getCategory callback function from data
    data.getCategory(req.params.category, function(category_selected) {
        res.json(category_selected);
    })
});

// Add /categories endpoint
app.get("/categories", function(req, res) {
    // Call getCategories from data
    data.getCategories(function(book_categories) {
        res.json(book_categories);
    });
});

// Initiate listen on port 3000
app.listen(3000, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log("Server started.");
});