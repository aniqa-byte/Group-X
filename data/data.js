"use strict";

// Import Sqlite3 library.
const sqlite3 = require("sqlite3").verbose();

// The application layer uses library classes
const library = require("../library.js");

// Initiate database connection
var db = new sqlite3.Database("data/database.db", function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log("Connected to library database.");
});

// Export getUsers function, displaying public user details
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
            var credential = new library.User(row.password);
            // Create user object
            var user_detail = new library.User(row.id, row.email, row.access);
            // Add user to created array
            user_collection.push(user_detail);
        }
        // Execute callback function
        callback(user_collection);
    });
};

exports.getUserProfile = function(email, callback) {
    // Create SQL statement
    var sql = `
        SELECT
            users.id,
            users.email
        FROM users
        WHERE users.email = '${email}'`;
    // Execute query. Returning user row matching email.
    db.get(sql, function(err, row) {
        if (err) {
            return console.error(err.message);
        }
        // Create a profile object
        var user_profile = new library.User(row.id, row.email);
        // Return profile
        callback(user_profile);
    });
};

// Export getBookItems callbook function, retrieving all open book items
exports.getBookItems = function(callback) {
    // SQL statement
    var sql = `
        SELECT
            books.title,
            books.author,
            books.genre,
            books.item_link,
            books.item_description
        FROM
            books,
            book_categories
        WHERE
            books.visible = 1
            AND books.genre = book_categories.category
        `;
    // Excecute query. Return all book item details
    db.all(sql, function(err, rows) {
        // Error handling
        if (err) {
            return console.error(err.message);
        }
        // Create an array for book items
        var book_collection = [];
        // Loop through rows creating Book object
        for (var row of rows) {
            // Create book category object
            var categ = new library.Book(row.genre);
            // Create book item object
            // TO DO add item_description to book item object
            var book = new library.Book(row.title, row.author, row.item_link, categ);
            // Add book item to array
            book_collection.push(book);
        }
        // Execute callback function
        callback(book_collection);
    });
};

// Export getCategories function, display all category types
exports.getCategories = function(callback) {
    // Create SQL statement
    var sql = `
        SELECT
            bc.category,
            bc.category_description
        FROM book_categories bc
        `;
    // Execute query. Return all book category types
    db.all(sql, function(err, rows) {
        // Error handling
        if (err) {
            return console.error(err.message);
        }
        // Create an array of categories
        var category_types = [];
        // Loop through rows creating Category objects
        for (var row of rows) {
            // Create category object
            var category_type = new library.Book(row.category, row.category_description);
            // Add category to array
            category_types.push(category_type);
        }
        // Execute callback function
        callback(category_types);
    });
};