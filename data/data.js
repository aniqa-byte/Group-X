"use strict";

// Import Sqlite3 library.
const sqlite3 = require("sqlite3").verbose();

// The application layer uses library classes
const library = require("../library.js");

// Initiate database connection
var db = new sqlite3.Database("data/database.db", (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to library database.");
    });

// Export getUsers function, displaying public user details
exports.getUsers = (callback) => {
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
    db.all(sql, (err, rows) => {
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

exports.getUserProfile = (email, callback) => {
    // Create SQL statement
    var sql = `
        SELECT
            users.id,
            users.email
        FROM users
        WHERE users.email = '${email}'`;
    // Execute query. Returning user row matching email.
    db.get(sql, (err, row) => {
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
exports.getBookItems = (callback) => {
    // SQL statement
    var sql = `
        SELECT
            books.title,
            books.author,
            books.genre
        FROM
            books
        WHERE
            books.visible = 1
        `;
    // Excecute query. Return all book item details
    db.all(sql, (err, rows) => {
            // Error handling
            if (err) {
                return console.error(err.message);
            }
            // Create an array for book items
            var book_collection = [];
            // Loop through rows creating Book object
            for (var row of rows) {
                // Create book item object
                var book = new library.Book(row.title, row.author, row.genre);
                // Add book item to array
                book_collection.push(book);
            }
            // Execute callback function
            callback(book_collection);
        });
};

// Export getBook callback function, retrieving selected book item
exports.getBook = (title, callback) => {
    // Create SQL statement
    var sql = `
    SELECT
        b.title,
        b.author,
        b.genre,
        b.item_link,
        b.item_description
    FROM
        books b
    WHERE
        b.title = '${title}'
    `;
    // Execute query. Return book matching title entry
    db.get(sql, (err, row) => {
            if (err) {
                return console.error(error.message);
            }
            // Create a book object
            var book_item = new library.Book(row.title, row.author, row.genre, row.item_link, row.item_description);
            // Return selected
            callback(book_item);
        });
};

// Export getAllGenre function, display all category types
exports.getAllGenre = (callback) => {
    // Create SQL statement
    var sql = `
        SELECT
            bg.genre,
            bg.genre_description
        FROM book_genre bg
        `;
    // Execute query. Return all book genre types
    db.all(sql, (err, rows) => {
            // Error handling
            if (err) {
                return console.error(err.message);
            }
            // Create an array of genre
            var genre_types = [];
            // Loop through rows creating Genre objects
            for (var row of rows) {
                // Create genre object
                var genre_type = new library.Book(row.genre, row.genre_description);
                // Add genre to array
                genre_types.push(genre_type);
            }
            // Execute callback function
            callback(genre_types);
        });
};

// TODO1: integrate and match with selected book
// Export getGenre callback function, retrieve selected category
exports.getGenre = (genre, callback) => {
    // Create sql statement
    var sql = `
    SELECT
        bg.genre,
        bg.genre_description
    FROM
        book_genre bg
    WHERE
        bc.genre = '${genre}'
    `;
    // Execute sql query, retrieve category details matching category input
    db.get(sql, (err, row) => {
            // Error handling
            if (err) {
                return console.error(err.message);
            }
            // Create selected genre object
            var genre_selected = new library.Book(row.genre, row.genre_description);
            // Return genre
            callback(genre_selected);
        });
};