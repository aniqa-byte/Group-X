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
app.get("/user/:email", (req, res) => {
        // Call getUserProfile from data
        data.getUserProfile(req.params.email, (user_profile) => {
                res.json(user_profile);
            });
    });

// Add /users endpoint
app.get("/users", (req, res) => {
        // Call getUsers from data
        data.getUsers((user_collection) => {
                res.json(user_collection);
            });
    });

// Add /book endpoint
app.get("/book/:title", (req, res) => {
        // Call getBook from data
        data.getBook(req.params.title, (book_item) => {
                res.json(book_item);
            });
    });

// Add /books endpoint
app.get("/books", (req, res) => {
        // Call getBookItems from data
        data.getBookItems((book_collection) => {
                res.json(book_collection);
            });
    });

// Add /genre endpoint
app.get("/genre/:genre", (req, res) => {
        // Call getGenre callback function from data
        data.getGenre(req.params.genre, (genre_selected) => {
                res.json(genre_selected);
            });
    });

// Add /all-genre endpoint
app.get("/all-genre", (req, res) => {
        // Call getAllGenre from data
        data.getAllGenre((genre_types) => {
                res.json(genre_types);
            });
    });

// Initiate listen on port 3000
app.listen(3000, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Server listening on port 3000.");
    });