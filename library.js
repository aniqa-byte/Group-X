"use strict";

exports.User = class {
    // User ID
    id;
    // User email
    email;
    // Password
    password;
    // Admin
    access = 0;

    constructor(id, email, password, access) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.access = access;
    }
}

exports.Book = class {
    // Item title
    title;
    // Item author
    author;
    // Item category
    genre;

    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}

exports.Book_details = class {
    // Item URL link
    item_link;
    // Item description
    item_description;
    // Book item title
    title;

    constructor(item_link, item_description, title) {
        this.item_link = item_link;
        this.item_description = item_description;
        this.title = title;
    }
}

exports.Book_genre = class {
    // Genre category
    genre;
    // Genre category description
    genre_description;

    constructor(genre, genre_description) {
        this.genre = genre;
        this.genre_description = genre_description;
    }
}