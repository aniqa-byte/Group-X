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
    // Call getUser from data
    data.getUser(req.params.email, (user) => {
        res.json(user);
    });
});

// Add /all-users endpoint
app.get("/all-users", (req, res) => {
    // Call getUsers from data
    data.getAllUsers((users) => {
        res.json(users);
    });
});

// Delete User Endpoint /user/:email
app.delete("/user/:email", (req, res) => {
    // Delete run parameter on data from admin_access table
    data.deleteAccess(req.params.email, () => {
        // Delete run parameter on data from credentials table
        data.deleteCredential(req.params.email, () => {
            // Delete run parameter on data from users table
            data.deleteUser(req.params.email, () => {
                res.send("OK");
            });
        });
    });
});

// Validate /validate-admin endpoint
app.get("/validate-admin/:email/:password", (req, res) => {
    // call validateAdmin from data
    data.validateAdmin(req.params.email, req.params.password, (access_level) => {
        res.json(access_level)
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
app.get("/all-books", (req, res) => {
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