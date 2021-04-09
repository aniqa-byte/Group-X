"use strict";

exports.User = class {
    // User ID
    id;
    // User email
    email;

    constructor(id, email) {
        this.id = id;
        this.email = email;
    }
}

exports.User_access = class {
    // access level - default non-admin
    access = 0;
    // password
    password;

    constructor(access, password) {
        this.access = access;
        this.password = password;
    }
}

exports.Credential = class {
    // user id
    id;
    // password
    password;

    constructor(id, password) {
        this.id = id;
        this.password = password;
    }
}

exports.Login = class {
    // user email
    email;
    // password
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
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

exports.Book_complete = class {
    title;
    author;
    genre;
    item_link;
    item_description;

    constructor(title, author, genre, item_link, item_description) {
        this.title = title;
        this.author = author || "Empty Author";
        this.genre = genre;
        this.item_link = item_link;
        this.item_description = item_description || "Empty Description";
    }
}