"use strict";

// Import Sqlite3 library.
const sqlite3 = require("sqlite3").verbose();

// The application layer uses library classes
const library = require("../library.js");

const material = require("./material.json");

console.log(material.book[0].title);

// Initiate database connection
// Local storage database development method utilises database.sql
// var db = new sqlite3.Database("data/database.db", (err) => {
var db = new sqlite3.Database(":memory:", (err) => {
        // Notifiy error connecting to database
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to library database.");
    });

// Creating all tables of database
db.serialize(() => {
    // User relevant tables
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, id INTEGER (255))");
    db.run("CREATE TABLE IF NOT EXISTS credentials (password TEXT, user_id INTEGER (255), FOREIGN KEY (user_id) REFERENCES users (id))");
    db.run("CREATE TABLE IF NOT EXISTS admin_access (access INTEGER (1), user_id INTEGER (255), FOREIGN KEY (user_id) REFERENCES users (id))");
    // Book relevant tables
    db.run("CREATE TABLE IF NOT EXISTS books (title VARCHAR (50) PRIMARY KEY, author VARCHAR (50), genre VARCHAR (50), FOREIGN KEY (genre) REFERENCES book_genre (genre))");
    db.run("CREATE TABLE IF NOT EXISTS book_details (title VARCHAR (50), item_link TEXT, item_description TEXT, FOREIGN KEY (title) REFERENCES books (title))");
    db.run("CREATE TABLE IF NOT EXISTS book_genre (genre VARCHAR (50) PRIMARY KEY, genre_description TEXT)");
});

// Inserting all required (test) values
db.serialize(() => {
    // Insert of user relevant (test) values
    db.run("INSERT INTO users VALUES('ROOT',1)");
    db.run("INSERT INTO credentials VALUES('ROOT',1)");
    db.run("INSERT INTO admin_access VALUES(1,1)");
    db.run("INSERT INTO users VALUES('test1@email.com',2)");
    db.run("INSERT INTO credentials VALUES('AAA111',2)");
    db.run("INSERT INTO admin_access VALUES(1,2)");
    // Insert of book relevant (test) values
    db.run(`INSERT INTO books VALUES('${material.book[0].title}','${material.book[0].author}','${material.book[0].genre}')`);
    db.run(`INSERT INTO book_details VALUES('${material.book[0].title}','${material.book[0].item_link}','${material.book[0].item_description}')`);
    db.run(`INSERT INTO book_genre VALUES('${material.book[0].genre}','${material.book[0].item_description}')`);
    /*
    db.run("INSERT INTO books VALUES('Title 1','Author 1','Genre 1')");
    db.run("INSERT INTO books VALUES('Angular JS','Author 1','Genre 1')");
    db.run("INSERT INTO books VALUES('SQLite','Author 2','Genre 1')");
    db.run("INSERT INTO books VALUES('Node JS','Author 3','Genre 2')");
    db.run("INSERT INTO books VALUES('Python','Author 4','Genre 3')");
    db.run("INSERT INTO books VALUES('Title 6','Author 4','Genre 3')");
    db.run("INSERT INTO book_details VALUES('Title 1','https://www.google.co.uk','1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_details VALUES('Angular JS','https://angularjs.org/','2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_details VALUES('SQLite','https://sqlite.org/index.html','3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_details VALUES('Node JS','https://nodejs.org/en/docs/','4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_details VALUES('Python','https://docs.python.org/3/','5Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_details VALUES('Title 6','https://www.google.co.uk','6Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_genre VALUES('Genre 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_genre VALUES('Genre 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_genre VALUES('Genre 3','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
    db.run("INSERT INTO book_genre VALUES('Genre 4','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')");
  */
  });
/*
// TODO: unused in login feature (query is functional)
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
*/

// User verification callback, used in login feature
// TODO frontend integration, fix bug, 
exports.validateUser = (email, password, callback) => {
    // Create sql query that returns existence count
    let sql = `
        SELECT COUNT(*) AS record_validated
        FROM users u
          INNER JOIN credentials c
            ON u.id=c.user_id
        WHERE
          u.email = '${email}'
          AND
          c.password = '${password}'
        GROUP BY u.email
    `;
    // Commit query
    db.get(sql, (err, row) => {
        try {
            // Qualify value of COUNT result
            let validate = row.record_validated
            if (validate === 1) {
                return console.log("Validated User");
            } else {
                return console.log("Not a user");
            }
        }
        catch(err) {
            return console.error(err.message);
        }
        callback(validate);
    });
}

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
        try {
            // Create a user object
            var user = new library.User(row.id, row.email);
            // Return profile
            callback(user);
        }
        catch(err) {
            return console.error(err.message);

        }
    });
};

exports.registerUser = (user, callback) => {
    // Create SQL insert statement
    var sql = `INSERT INTO users VALUES('${user.email}', ${user.id})`;
    // Execute SQL insert statement
    db.exec(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        // Create SQL insert statement
        sql = `INSERT INTO credentials VALUES('${user.password}', '${user.id}')`;
        // Execute SQL insert statement
        db.exec(sql, (err) => {
            if (err) {
                return console.error(err.message);
            }
            // Create SQL insert statement
            sql = `INSERT INTO admin_access VALUES(0,'${user.id}')`;
            db.exec(sql, (err) => {
                if (err) {
                    return console.error(err.message);
                }
                callback();
            });
        });
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
    // Execute query
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
    // Execute sql
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
    // Execute delete
    db.exec(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        callback();
    });
};
/*
// TODO: Congregated variation of the delete user callback, lacks success
exports.userDeletion = (id, callback) => {
  // sql statement
  var sql =`
    DELETE FROM
      admin_access
    WHERE
      user_id = ${id}
    `;
  db.exec(sql, (err) => {
    if (err) {
      return console.error(err.message);
    }
    sql = `
      DELETE FROM
        credentials
      WHERE
        user_id = ${id}
      `;
    db.exec(sql, (err) => {
      if (err) {
        return console.error(err.message);
      }
      sql = `
        DELETE FROM
          users
        WHERE
          id = ${id}
        `;
      db.exec(sql, (err) => {
        if (err) {
          return console.error(err.message);
        }
        callback();
      });
    });
  });
};
*/
// Export updateUserEmail email callback function, where user input matches id parameter
exports.updateUserEmail = (user, callback) => {
    // Create sql update statement
    var sql = `
        UPDATE
          users
        SET
          email = '${user.email}'
        WHERE
          id = ${user.id}
        `;
    // Execute update query
    db.exec(sql, (err) => {
        try {
            callback(user);
        }
        catch(err){
            return console.error(err.message);
        }
    });
};

// Export updateUserPass password callback function, where user input matches id parameter
exports.updateUserPass = (user, callback) => {
    // Create SQL statement
    var sql = `
        UPDATE
          credentials
        SET
          password = '${user.password}'
        WHERE
          user_id = ${user.id}
        `;
    // callback updated executed query
    db.exec(sql, (err) => {
        try{
            callback(user);
        }
        catch(err) {
            return console.error(err.message);
        }
    });
};

// Export getBookItems callback function, retrieving all open book items
exports.getBookItems = (callback) => {
    // SQL statement
    var sql = `
        SELECT
          b.title,
          b.author,
          b.genre,
          bd.item_link,
          bd.item_description
        FROM books b
          INNER JOIN book_details bd
            ON b.title = bd.title
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
                var book = new library.Book_complete(row.title, row.author, row.genre, row.item_link, row.item_description);
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
        // Error handling method
        try {
            // Create a book object
            var book_item = new library.Book_details(row.item_link, row.item_description, row.title);
            // Return selected
            callback(book_item);
        }
        catch(err) {
            return console.error(err.message);
        }
    });
};

// Export book search sql callback function
exports.searchBook = (title, callback) => {
    // Create SQL statement
    let sql = `
        SELECT
          b.title,
          b.author,
          b.genre,
          bd.item_link,
          bd.item_description
        FROM books b
          INNER JOIN book_details bd
            ON b.title = bd.title
        WHERE
          b.title = '${title}'
        GROUP BY
          b.title
          `;
    db.get(sql, (err, row) => {

        try {
            var searched_book = new library.Book_complete(row.title, row.author, row.genre, row.item_link, row.item_description)
            callback(searched_book);
        }
        catch (err) {
            console.error(err.message);
        }
    });
};

// Export multiple delete book callback function, removing book across matching database tables
exports.deleteBook = (title, callback) => {
    // Create sql statement
    var sql = `
        DELETE FROM
          books
        WHERE
          title = '${title}'
        `;
    // Execute delete query
    db.exec(sql, (err) => {
        if (err) {
          return console.error(err.message);
        }
        // Create paired sql query
        var sql = `
            DELETE FROM
              book_details
            WHERE
              title = '${title}'
            `;
        // Excecute delete query
        db.exec(sql, (err) => {
          if (err) {
            return console.error(err.message);
          }
          callback();
        });
    });
};

// Export total genre selection callback function
exports.getAllBookGenres = (callback) => {
    // Create distinct genre selection query
    var sql = `
        SELECT DISTINCT
          genre
        FROM
          books
        `;
    db.all(sql, (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        // Create Genre type array
        var genre_types = [];
        for (var row of rows) {
            // Create genre object
            var genre_type = new library.Book_genre (row.genre);
            // Push query result to array
            genre_types.push(genre_type);
        }
        callback(genre_types);
    });

}

// Export update genre callback funciton
exports.updateBookGenre = (book, callback) => {
    // Build sql statement, matching parameter
    var sql = `
        UPDATE
          books
        SET
          genre = '${book.genre}'
        WHERE
          title = '${book.title}'
        `;
    // Execute query
    db.exec(sql, (err) => {
        try{
            callback(book);
        }
        catch(err) {
            return console.error(err.message);
        }
    });
}

// Export update book link callback function
exports.updateBookLink = (book, callback) => {
    // Build sql statement, finding matched parameter
    var sql = `
        UPDATE
          book_details
        SET
          item_link = '${book.item_link}'
        WHERE
          title = '${book.title}'
        `;
    // Execute sql statement
    db.exec(sql, (err) => {
        try{
            callback(book);
        }
        catch(err) {
            return console.error(err.message);
        }
    });
}

// Export update book description callback function
exports.updateBookDescription = (book, callback) => {
    // Create sql statement
    var sql = `
        UPDATE
          book_details
        SET
          item_description = '${book.item_description}'
        WHERE
          title = '${book.title}'
        `;
    // Execute update query
    db.exec(sql, (err) => {
        try{
            callback(book);
        }
        catch(err) {
            return console.error(err.message);
        }
    });
}

// Exports createbook callback function, inserting user entry
exports.createBookEntry = (book, callback) => {
    // Form query from input data
    var sql = `INSERT INTO books VALUES('${book.title}', '${book.author}', '${book.genre}')`;
    // Execute SQL insert statement
    db.exec(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        // Form query from input data
        var sql = `INSERT INTO book_details VALUES('${book.title}', '${book.item_link}', '${book.item_description}')`;
        // Execute SQL insert statement
        db.exec(sql, (err) => {
            if (err) {
                return console.error(err.message);
            }
            callback();
        });
    });
}

// Export matchedGenreBooks callback function, retrieve selected category
exports.matchedGenreBooks = (genre, callback) => {
    // Create sql statement
    var sql = `
        SELECT
          books.title,
          books.author,
          books.genre
        FROM
          books
        WHERE
          books.genre = '${genre}'
        `;
    // Execute sql query, retrieve category details matching category input
    db.all(sql, (err, row) => {
            // Error handling
            if (err) {
                return console.error(err.message);
            }
            var matched_books = [];
            for (var row of rows) {
                // Create selected genre object
                var matched_book = new library.Book(row.title, row.author, row.genre);
                matched_books.push(matched_book);
            }
            // Return genre
            callback(matched_books);
        });
};