"use strict";

// Import Sqlite3 library.
const sqlite3 = require("sqlite3").verbose();

// The application layer uses student classes
const student = require("../library.js");

// Initiate database connection
var db = new sqlite3.Database("data/database.db", function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to library database.");
});