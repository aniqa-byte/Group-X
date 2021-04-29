"use strict";

// The application layer to use user and item classes
const library = require("../library.js");

// The application layer to access the data layer
const data = require("../data/data.js");

// Import express library
const express = require("express");

const path = require('path');

// Value express application
var app = express();

// Add static files location
app.use(express.static("static"));

// Add JSON parsin for incoming data
app.use(express.json());

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

app.get("/validate-login/:email/:password", (req, res) => {
    data.validateUser(req.params.email, req.params.password, (validate) => {
        res.json(validate);
    });
});

// Add /user post endpoint
app.post("/user", (req, res) => {
    if (!req.body.email) {
        console.log("Emails was not provided.");
        return res.status(400).send({
            message: "A email must be provided."
        });
    } else if (!req.body.password) {
        console.log("Password was not provided.")
        return res.status(400).send({
            message: "A password must be provided."
        });
    }
    // Call register on data
    data.registerUser(req.body, () => {
        res.send("OK");
    });
});

// Add /user post endpoint
app.put("/update/email", (req, res) => {
    if (!req.body.email) {
        console.log("Email was not provided");
        return res.status(400).send({
            message: "A email must be provided."
        });
    }
    // Call register on data
    data.updateUserEmail(req.body, () => {
        res.send("OK");
    });
});

// Add /user post endpoint
app.put("/update/pass", (req, res) => {
    if (!req.body.password) {
        console.log("Password was not provided.")
        return res.status(400).send({
            message: "A password must be provided."
        });
    }
    // Call register on data
    data.updateUserPass(req.body, () => {
        res.send("OK");
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

// Add /all-genre endpoint
app.get("/all-book-genres", (req, res) => {
    // Call getAllGenre from data
    data.getAllBookGenres((genre_types) => {
        res.json(genre_types);
    });
});

// Book search function endpoint
app.get("/search-book/:title", (req, res) => {
    data.searchBook(req.params.title, (searched_book) => {
        res.json(searched_book);
    });
});

app.delete("/book/:title", (req, res) => {
    data.deleteBook(req.params.title, () => {
        res.send("OK");
    })
})

// Add book item endpoint
app.post("/book", (req, res) => {
    if (!req.body.title) {
        console.log("Title was not provided.")
        return res.status(400).send({
            message: "A title must be provided."
        });
    } else if (!req.body.genre) {
        console.log("Genre was not provided.")
        return res.status(400).send({
            message: "A genre must be provided."
        });
    } else if (!req.body.item_link) {
        console.log("Link was not provided.")
        return res.status(400).send({
            message: "A link must be provided."
        });
    }
    data.createBookEntry(req.body, () => {
        res.send("OK");
    });
});

// Update book genre endpoint
app.put("/update/book/genre", (req, res) => {
    if (!req.body.genre) {
        console.log("Genre was not provided.")
        return res.status(400).send({
            message: "A Genre must be provided."
        });
    }
    data.updateBookGenre(req.body, () => {
        res.send("OK");
    });
});

// Update book item link endpoint
app.put("/update/book/link", (req, res) => {
    if (!req.body.item_link) {
        console.log("Link was not provided.")
        return res.status(400).send({
            message: "A Link must be provided."
        });
    }
    data.updateBookLink(req.body, () => {
        res.send("OK");
    });
});

// Update book description endpoint
app.put("/update/book/description", (req, res) => {
    if (!req.body.item_description) {
        console.log("Description was not provided.")
        return res.status(400).send({
            message: "A Description must be provided."
        });
    }
    data.updateBookDescription(req.body, () => {
        res.send("OK");
    });
});

app.get("/books-genre-match/:genre", (req, res) => {
    // Call getGenre callback function from data
    data.matchedGenreBooks(req.params.genre, (matched_books) => {
        res.json(matched_books);
    });
});

// Set books dashboard to root path endpoint
app.get("/", (req, res) => {
    // Redirect to books dashboard path in static
    res.sendFile("books_dashboard.html", { root: path.join(__dirname, '../static/')});
});

// Capture 404 errors
app.get("*", (req, res) => {
    // Redirect to error page
    res.sendFile("404.html", { root: path.join(__dirname, '../static/')});
});

// Initiate listen on port 3000
app.listen(3000, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Server listening on port 3000.");
});