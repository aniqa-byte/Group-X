"use strict";

// Import Sqlite3 library.
const sqlite3 = require("sqlite3").verbose();

// The application layer uses student classes
const user = require("../library.js");

// Initiate database connection
var db = new sqlite3.Database("data/database.db", function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to library database.");
});

// Export getUsers function
exports.getUsers = function(callback) {
    // Create SQL statement
    var sql = `
        SELECT
            users.id,
            users.email,
            credentials.password
        FROM
            users,
            credentials
        WHERE
            users.id = credentials.user_id
        `;
    // Execute query. Return all
    db.all(sql, function(err, rows) {
        // Check if error
        if (err) {
            return console.error(err.message);
        }
        // Create an array of users
        var user_collection = [];
        // Create loop through the rows to build user objects
        for (var row of rows) {
            // Create credentials object
            var credential = new user.User(row.password);
            // Create user object
            var user_detail = new user.User(row.id, row.email, credential);
            // Add user to created array
            user_collection.push(user_detail);
        }
        // Execute callback function
        callback(user_collection);
    });
};