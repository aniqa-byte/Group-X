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

exports.validateAdmin = (email, password, callback) => {
    // Create SQL statement
    var sql = `
        SELECT
          aa.access
        FROM
          admin_access aa
        WHERE
          aa.user_id = (SELECT
                          c.user_id
                        FROM
                          credentials c,
                          users u
                        WHERE
                          c.password = '${password}'
                          AND
                          u.email = '${email}'
                        )
        `;
    db.get(sql, function(err, row) {
        // Selected user access level as parameter for conditional statements
        let user_access = row.access
        // Error handling
        if (err) {
            return console.error(err.message);
        // Qualify if user is not admin level
        } else if (user_access !== 1) {
            return console.log("User is not an Admin");
        // Qualify if user is admin level
        } else if (user_access === 1) {
            return console.log("User is an admin");
        };
        // Create Access Level Object
        var access_level = new library.User_access(row.access);
        // Return user admin
        callback(access_level);
    });
};


// Export getUsers function, displaying public user details
exports.getAllUsers = (callback) => {
    // Create SQL statement
    var sql = `
        SELECT
          u.id,
          u.email
        FROM
          users u
        WHERE
          u.email != 'ROOT'
          AND
          u.id != 1
        `;
    // Execute query. Return all
    db.all(sql, (err, rows) => {
        // Check if error
        if (err) {
            return console.error(err.message);
        }
        // Create an array of users
        var users = [];
        // Create loop through the rows to build user objects
        for (var row of rows) {
            // Create user object
            var user = new library.User(row.id, row.email);
            // Add user to created array
            users.push(user);
        }
        // Execute callback function
        callback(users);
    });
};

exports.getUser = (email, callback) => {
    // Create SQL statement
    var sql = `
        SELECT
            u.id,
            u.email,
            aa.access
        FROM
            users u,
            admin_access aa
        WHERE
            u.email = '${email}'
            AND
            u.id = aa.user_id
        `;
    // Execute query. Returning user row matching email.
    db.get(sql, (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            // Create a user object
            var user = new library.User(row.id, row.email);
            // Return profile
            callback(user);
        });
};

// Export deleteUser callback function, delete user matching parameter
exports.deleteUser = (email, callback) => {
    // sql statement
    var sql = `
        DELETE FROM
          users
        WHERE
          email = '${email}'
        `;
    db.exec(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        callback();
    });
};

// Export deleteUser callback function, delete user matching parameter
exports.deleteCredential = (email, callback) => {
    // sql statement
    var sql =`
        DELETE FROM
          credentials
        WHERE
          user_id = (SELECT
                       id
                     FROM
                       users
                     WHERE
                       email = '${email}')
        `;
    db.exec(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        callback();
    });
};

// Export deleteAccess callback function, delete user matching parameter
exports.deleteAccess = (email, callback) => {
    // sql statement
    var sql =`
        DELETE FROM
          admin_access
        WHERE
          user_id = (SELECT
                       id
                     FROM
                       users
                     WHERE
                       email = '${email}')
        `;
    db.exec(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        callback();
    });
};

// Export getBookItems callback function, retrieving all open book items
exports.getBookItems = (callback) => {
    // SQL statement
    var sql = `
        SELECT
            books.title,
            books.author,
            books.genre
        FROM
            books
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
        bd.item_link,
        bd.item_description,
        bd.title
    FROM
        book_details bd
    WHERE
        bd.title = '${title}'
    `;
    // Execute query. Return book matching title entry
    db.get(sql, (err, row) => {
            if (err) {
                return console.error(error.message);
            }
            // Create a book object
            var book_item = new library.Book_details(row.item_link, row.item_description, row.title);
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
                var genre_type = new library.Book_genre(row.genre, row.genre_description);
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
        bg.genre = '${genre}'
    `;
    // Execute sql query, retrieve category details matching category input
    db.get(sql, (err, row) => {
            // Error handling
            if (err) {
                return console.error(err.message);
            }
            // Create selected genre object
            var genre_selected = new library.Book_genre(row.genre, row.genre_description);
            // Return genre
            callback(genre_selected);
        });
};